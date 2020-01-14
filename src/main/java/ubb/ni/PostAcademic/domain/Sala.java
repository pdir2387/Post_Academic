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
    @ManyToOne
    @JoinColumn
    private Cladire locatie;

    public Sala() {

    }

    public Sala(String nume, Cladire locatie) {
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

    public Cladire getLocatie() {
        return locatie;
    }

    public void setLocatie(Cladire locatie) {
        this.locatie = locatie;
    }
}
