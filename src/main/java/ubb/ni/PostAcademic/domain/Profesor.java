package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "profesori")
public class Profesor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String username;
    @Column
    private String nume;
    @Column
    private String email;
    @Column
    private String website;
    @Column
    private String adresa;
    @Column
    private String telefon;
    @Column
    private ArrayList<String> domeniiDeInteres;

    public Profesor(){

    }

    public Profesor(String username, String nume, String email, String website, String adresa, String telefon, ArrayList<String> domeniiDeInteres) {
        this.username = username;
        this.nume = nume;
        this.email = email;
        this.website = website;
        this.adresa = adresa;
        this.telefon = telefon;
        this.domeniiDeInteres = domeniiDeInteres;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public ArrayList<String> getDomeniiDeInteres() {
        return domeniiDeInteres;
    }

    public void setDomeniiDeInteres(ArrayList<String> domeniiDeInteres) {
        this.domeniiDeInteres = domeniiDeInteres;
    }
}