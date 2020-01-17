package ubb.ni.PostAcademic.service;

import com.sun.mail.imap.IMAPFolder;
import com.sun.mail.imap.IMAPStore;
import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import ubb.ni.PostAcademic.domain.User;


import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.util.ByteArrayDataSource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;

import java.io.IOException;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class EmailService {
    String imapHost = "scs.ubbcluj.ro";
    String smtpHost = "scs.ubbcluj.ro";
    String host = "scs.ubbcluj.ro";


    public ArrayList<ArrayList<String>> getAll(String folder) {
        ArrayList<ArrayList<String>> msgs = new ArrayList<>();
        try {
            //1) get the session object
            Properties properties = new Properties();
            properties.put("mail.imap.host", imapHost);
//            properties.put("mail.pop3.starttls.enable","true");
//            properties.put("mail.pop3.auth", "true");
            properties.setProperty("mail.imap.ssl.enable", "true");
            //properties.put("mail.pop3.socketFactory.fallback", "false");

            Session emailSession = Session.getDefaultInstance(properties);

            //2) create the POP3 store object and connect with the pop server
            IMAPStore emailStore = (IMAPStore) emailSession.getStore("imap");
            emailStore.connect(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());

            //3) create the folder object and open it
            Folder emailFolder = emailStore.getFolder(folder);
            if (!emailFolder.isOpen()) {
                emailFolder.open(Folder.READ_ONLY);
            }
            IMAPFolder pf =(IMAPFolder)emailFolder;

            //4) retrieve the messages from the folder in an array and print it
            for(Message m :emailFolder.getMessages()){
                ArrayList<String> el = new ArrayList<>();

                el.add(String.valueOf(pf.getUID(m)));

                if(m.getFlags().contains(Flags.Flag.SEEN)){
                    el.add("true");
                }else{
                    el.add("false");
                }
                el.add(m.getSubject());
                if(folder.equals("INBOX")){
                    el.add(m.getFrom()[0].toString());
                }else{
                    el.add(m.getAllRecipients()[0].toString());
                }


                if(folder.equals("INBOX")){
                    el.add(m.getReceivedDate().toString());
                }else{
                    el.add(m.getSentDate().toString());
                }

                el.add(getTextFromMessage(m));


                if(m.getContentType().contains("multipart")){
                    Multipart multiPart = (Multipart) m.getContent();

                    for (int i = 0; i < multiPart.getCount(); i++) {
                        MimeBodyPart part = (MimeBodyPart) multiPart.getBodyPart(i);
                        if (Part.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                            el.add(part.getFileName());
                        }
                    }
                }


                msgs.add(el);
            }

            //5) close the store and folder objects
            emailFolder.close(false);
            emailStore.close();

        } catch (NoSuchProviderException e) {
            e.printStackTrace();
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return msgs;
    }

    private String getTextFromMessage(Message message) throws MessagingException, IOException, javax.mail.MessagingException {
        String result = "";
        if (message.getContentType().contains("text/plain")) {
            result = message.getContent().toString();
        }

        else if (message.getContentType().contains("text/html")) { // **
            result = message.getContent().toString(); // **
        }

        else if (message.getContentType().contains("multipart")) {
            MimeMultipart mimeMultipart = (MimeMultipart) message.getContent();
            result = getTextFromMimeMultipart(mimeMultipart);
        }
        return result;
    }

    private String getTextFromMimeMultipart(
            MimeMultipart mimeMultipart) throws MessagingException, IOException, javax.mail.MessagingException {
        String result = "";
        int count = mimeMultipart.getCount();
        for (int i = 0; i < count; i++) {
            BodyPart bodyPart = mimeMultipart.getBodyPart(i);
//            if (bodyPart.isMimeType("text/plain")) {
//                result = result + "\n" + bodyPart.getContent();
//                break; // without break same text appears twice in my tests
//            } else
            if (bodyPart.isMimeType("text/html")) {
                String html = (String) bodyPart.getContent();
                result = result + "\n" + org.jsoup.Jsoup.parse(html).text();
            } else if (bodyPart.getContent() instanceof MimeMultipart){
                result = result + getTextFromMimeMultipart((MimeMultipart)bodyPart.getContent());
            }
        }
        return result;
    }

    public String sendEmail(String to, String subject, String message, JSONArray attachements){
        String error = "";
        Properties prop = new Properties();
        prop.put("mail.smtp.host", smtpHost);
        //prop.put("mail.smtp.auth", "true");
//        prop.put("mail.smtp.auth", "true"); //enable authentication
//        prop.put("mail.smtp.starttls.enable", "true"); //enable STARTTLS
        prop.setProperty("mail.smtp.ssl.enable", "true");
        prop.put("mail.smtp.port", 465);
//        prop.put("mail.smtp.connectiontimeout", "100");
//        prop.put("mail.smtp.timeout", "100");


        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());
                    }
                });

        try {

            Message m = new MimeMessage(session);
            m.setFrom(new InternetAddress(SecurityContextHolder.getContext().getAuthentication().getName()+"@"+host));
            m.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(to)
            );
            m.setSubject(subject);

            Multipart multipart = new MimeMultipart();

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setText(message);
            multipart.addBodyPart(messageBodyPart);

            for(int i=0; i<attachements.length();i++){
                messageBodyPart = new MimeBodyPart();
                JSONObject attach = new JSONObject(attachements.get(i).toString());

                System.out.println();
                String string_bytes =  attach.get("bytes").toString();

                DataSource source = new ByteArrayDataSource(Base64.getDecoder().decode(string_bytes), attach.getString("type"));
                messageBodyPart.setDataHandler(new DataHandler(source));

                String filename = attach.get("name").toString();
                messageBodyPart.setFileName(filename);

                multipart.addBodyPart(messageBodyPart);
            }


            //Send the complete message parts
            m.setContent(multipart);

            System.out.println(m.getAllRecipients()[0] + " " + m.getFrom()[0] + " " + m.getSubject());

            Transport.send(m);

            //save in sent
            Properties properties = new Properties();
            properties.put("mail.imap.host", imapHost);
            properties.setProperty("mail.imap.ssl.enable", "true");

            Session emailSession = Session.getDefaultInstance(properties);

            IMAPStore emailStore = (IMAPStore) emailSession.getStore("imap");

            emailStore.connect(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());

            //3) create the folder object and open it
            Folder emailFolder = emailStore.getFolder("Sent");
            if (!emailFolder.isOpen()) {
                emailFolder.open(Folder.READ_ONLY);
            }
            IMAPFolder pf =(IMAPFolder)emailFolder;

            Date date = new Date();
            m.setSentDate(date);
            System.out.println("saved in sent...");
            pf.appendMessages(new Message[]{m});

            pf.close(false);
            emailStore.close();


        } catch (AddressException e) {
            e.printStackTrace();
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
//        catch (IOException e) {
//            e.printStackTrace();
//        }

        return error;
    }

    public String saveDraft(String to, String subject, String message, JSONArray attachements){
        String error = "";
        Properties properties = new Properties();
        properties.put("mail.imap.host", imapHost);
        properties.setProperty("mail.imap.ssl.enable", "true");




        try {
            Session emailSession = Session.getDefaultInstance(properties);

            Message m = new MimeMessage(emailSession);
            m.setFrom(new InternetAddress(SecurityContextHolder.getContext().getAuthentication().getName()+"@"+host));
            m.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(to)
            );
            m.setSubject(subject);

            Multipart multipart = new MimeMultipart();

            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setText(message);
            multipart.addBodyPart(messageBodyPart);

            for(int i=0; i<attachements.length();i++){
                messageBodyPart = new MimeBodyPart();
                JSONObject attach = new JSONObject(attachements.get(i).toString());

                System.out.println();
                String string_bytes =  attach.get("bytes").toString();

                DataSource source = new ByteArrayDataSource(Base64.getDecoder().decode(string_bytes), attach.getString("type"));
                messageBodyPart.setDataHandler(new DataHandler(source));

                String filename = attach.get("name").toString();
                messageBodyPart.setFileName(filename);

                multipart.addBodyPart(messageBodyPart);
            }


            //Send the complete message parts
            m.setContent(multipart);

            //------------------------
            //2) create the POP3 store object and connect with the pop server
            IMAPStore emailStore = (IMAPStore) emailSession.getStore("imap");

            emailStore.connect(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());

            //3) create the folder object and open it
            Folder emailFolder = emailStore.getFolder("Drafts");
            if (!emailFolder.isOpen()) {
                emailFolder.open(Folder.READ_ONLY);
            }
            IMAPFolder pf =(IMAPFolder)emailFolder;

            Date date = new Date();
            m.setSentDate(date);
            System.out.println("appending...");
            pf.appendMessages(new Message[]{m});
            pf.close(false);
            emailStore.close();

        } catch (AddressException e) {
            e.printStackTrace();
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }
//        catch (IOException e) {
//            e.printStackTrace();
//        }

        return error;
    }

    public String read(String id, String folder){
        String error = "";
        Properties properties = new Properties();
        properties.put("mail.imap.host", imapHost);
        properties.setProperty("mail.imap.ssl.enable", "true");




        try {
            Session emailSession = Session.getDefaultInstance(properties);

            IMAPStore emailStore = (IMAPStore) emailSession.getStore("imap");

            emailStore.connect(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());

            //3) create the folder object and open it
            Folder emailFolder = emailStore.getFolder(folder);
            if (!emailFolder.isOpen()) {
                emailFolder.open(Folder.READ_WRITE);
            }
            IMAPFolder pf =(IMAPFolder)emailFolder;
            Message m = pf.getMessageByUID(Long.parseLong(id));
            Message[] msg = {m};

            pf.setFlags(msg, new Flags(Flags.Flag.SEEN), true);

            pf.close(false);
            emailStore.close();

        } catch (AddressException e) {
            e.printStackTrace();
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }

        return error;
    }

    public String delete(JSONArray array, String folder){
        String error = "";
        Properties properties = new Properties();
        properties.put("mail.imap.host", imapHost);
        properties.setProperty("mail.imap.ssl.enable", "true");




        try {
            Session emailSession = Session.getDefaultInstance(properties);

            IMAPStore emailStore = (IMAPStore) emailSession.getStore("imap");

            emailStore.connect(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());

            //3) create the folder object and open it
            Folder emailFolder = emailStore.getFolder(folder);
            if (!emailFolder.isOpen()) {
                emailFolder.open(Folder.READ_WRITE);
            }
            IMAPFolder pf =(IMAPFolder)emailFolder;

            long[] ids = new long[array.length()];
            for(int i=0; i<array.length();i++){
                ids[i] = array.getLong(i);
                System.out.println(ids[i]);
            }
            Message[] msg = pf.getMessagesByUID(ids);


            pf.setFlags(msg, new Flags(Flags.Flag.DELETED), true);

            pf.close(true);
            emailStore.close();

        } catch (AddressException e) {
            e.printStackTrace();
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }

        return error;
    }


    public JSONObject down(String mail_id, String file_id, String folder){
        String error = "";
        Properties properties = new Properties();
        properties.put("mail.imap.host", imapHost);
        properties.setProperty("mail.imap.ssl.enable", "true");

        JSONObject attach = new JSONObject();


        try {
            Session emailSession = Session.getDefaultInstance(properties);

            IMAPStore emailStore = (IMAPStore) emailSession.getStore("imap");

            emailStore.connect(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());

            //3) create the folder object and open it
            Folder emailFolder = emailStore.getFolder(folder);
            if (!emailFolder.isOpen()) {
                emailFolder.open(Folder.READ_WRITE);
            }
            IMAPFolder pf =(IMAPFolder)emailFolder;
            Message m = pf.getMessageByUID(Long.parseLong(mail_id));



            if(m.getContentType().contains("multipart")){
                Multipart multiPart = (Multipart) m.getContent();


                int contor = 0;
                for (int i = 0; i < multiPart.getCount(); i++) {
                    MimeBodyPart part = (MimeBodyPart) multiPart.getBodyPart(i);
                    if (Part.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                        if(contor == Integer.parseInt(file_id)){
                            byte[] byteArray = IOUtils.toByteArray(part.getInputStream());
                            String bytes = new String(Base64.getEncoder().encode(byteArray));
                            attach.put("bytes", bytes);
                            attach.put("type", part.getContentType());
                            attach.put("name", part.getFileName());
                            break;
                        }
                        contor++;
                    }
                }
            }



            pf.close(false);
            emailStore.close();



        } catch (AddressException e) {
            e.printStackTrace();
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return attach;
    }

}
