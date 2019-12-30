package ubb.ni.PostAcademic.domain;

import javax.persistence.*;

@Entity
@Table(name = "specializari")
public class Specializare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;
    @Column
    private int durata_studii;
    @ManyToOne
    @JoinColumn
    private Facultate facultate;

    public Specializare(){

    }

    public Specializare(String nume, int durata_studii, Facultate facultate) {
        this.nume = nume;
        this.durata_studii = durata_studii;
        this.facultate = facultate;
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

    public int getDurata_studii() {
        return durata_studii;
    }

    public void setDurata_studii(int durata_studii) {
        this.durata_studii = durata_studii;
    }

    public Facultate getFacultate() {
        return facultate;
    }

    public void setFacultate(Facultate facultate) {
        this.facultate = facultate;
    }
}
