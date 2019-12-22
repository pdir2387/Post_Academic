package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "studenti")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String username;
    @Column
    private String nume;
    @Column
    private String Telofon;
    @Column
    private String Email;
    @Column
    private Integer anulInscrierii;
    @OneToMany
    @JoinColumn
    private List<ContractStudii> contracteStudii;

    public Student(){

    }

    public Student(String username, String nume, String telofon, String email, Integer anulInscrierii, List<ContractStudii> contracteStudii) {
        this.username = username;
        this.nume = nume;
        Telofon = telofon;
        Email = email;
        this.anulInscrierii = anulInscrierii;
        this.contracteStudii = contracteStudii;
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

    public String getTelofon() {
        return Telofon;
    }

    public void setTelofon(String telofon) {
        Telofon = telofon;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public Integer getAnulInscrierii() {
        return anulInscrierii;
    }

    public void setAnulInscrierii(Integer anulInscrierii) {
        this.anulInscrierii = anulInscrierii;
    }

    public List<ContractStudii> getContracteStudii() {
        return contracteStudii;
    }

    public void setContracteStudii(List<ContractStudii> contracteStudii) {
        this.contracteStudii = contracteStudii;
    }
}
