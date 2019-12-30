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
    private String nume;
    @Column
    private String cnp;
    @Column
    private String Telofon;
    @Column
    private String cod_student;
    @ManyToOne
    @JoinColumn
    private Grupa grupa;
    @Column
    private Integer semestru;
    @Column
    private String Email;
    @Column
    private Integer anulInscrierii;
    @OneToMany
    @JoinColumn
    private List<ContractStudii> contracteStudii;
    @OneToOne
    @JoinColumn
    private User user;

    public Student(){

    }

    public Student(String nume, String cnp, String telofon, String cod_student, Grupa grupa, Integer semestru, String email, Integer anulInscrierii, List<ContractStudii> contracteStudii, User user) {
        this.nume = nume;
        this.cnp = cnp;
        Telofon = telofon;
        this.cod_student = cod_student;
        this.grupa = grupa;
        this.semestru = semestru;
        Email = email;
        this.anulInscrierii = anulInscrierii;
        this.contracteStudii = contracteStudii;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getCnp() {
        return cnp;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getTelofon() {
        return Telofon;
    }

    public void setTelofon(String telofon) {
        Telofon = telofon;
    }

    public String getCod_student() {
        return cod_student;
    }

    public void setCod_student(String cod_student) {
        this.cod_student = cod_student;
    }

    public Grupa getGrupa() {
        return grupa;
    }

    public void setGrupa(Grupa grupa) {
        this.grupa = grupa;
    }

    public Integer getSemestru() {
        return semestru;
    }

    public void setSemestru(Integer semestru) {
        this.semestru = semestru;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
