package ubb.ni.PostAcademic.service;

import com.sun.mail.imap.IMAPFolder;
import com.sun.mail.imap.IMAPStore;
import com.sun.mail.pop3.POP3Folder;
import com.sun.mail.pop3.POP3Store;
import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import org.jsoup.Jsoup;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import javax.mail.*;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import javax.transaction.Transactional;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Properties;

@Service
@Transactional
public class EmailService {
    String imapHost = "imap.yandex.com";



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

                if(folder.equals("INBOX")){
                    if(m.getFlags().contains(Flags.Flag.SEEN)){
                        el.add("true");
                    }else{
                        el.add("false");
                    }
                }
                el.add(m.getSubject());
                if(folder.equals("INBOX")){
                    el.add(m.getFrom()[0].toString());
                }else{
                    el.add(m.getAllRecipients()[0].toString());
                }

                el.add(m.getSentDate().toString());
                el.add(getTextFromMessage(m));


                if(!folder.equals("Drafts")){
                    if(m.getContentType().contains("multipart")){
                        Multipart multiPart = (Multipart) m.getContent();

                        for (int i = 0; i < multiPart.getCount(); i++) {
                            MimeBodyPart part = (MimeBodyPart) multiPart.getBodyPart(i);
                            if (Part.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                                el.add(part.getFileName());
                            }
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

}
