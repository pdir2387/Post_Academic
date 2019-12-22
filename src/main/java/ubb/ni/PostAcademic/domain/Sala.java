package ubb.ni.PostAcademic.domain;

import javax.persistence.*;

@Entity
@Table(name = "sali")
public class Sala {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;
    @Column
    private String locatie;

    public Sala(){

    }

    public Sala(String nume, String locatie) {
        this.nume = nume;
        this.locatie = locatie;
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

    public String getLocatie() {
        return locatie;
    }

    public void setLocatie(String locatie) {
        this.locatie = locatie;
    }
}
