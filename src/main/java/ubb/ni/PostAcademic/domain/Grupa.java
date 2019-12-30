package ubb.ni.PostAcademic.domain;

import javax.persistence.*;

@Entity
@Table(name = "grupa")
public class Grupa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;
    @ManyToOne
    @JoinColumn
    private Specializare specializare;
    @Column
    private Integer an_studiu;

    public Grupa(){

    }

    public Grupa(String nume, Specializare specializare, Integer an_studiu) {
        this.nume = nume;
        this.specializare = specializare;
        this.an_studiu = an_studiu;
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

    public Specializare getSpecializare() {
        return specializare;
    }

    public void setSpecializare(Specializare specializare) {
        this.specializare = specializare;
    }

    public Integer getAn_studiu() {
        return an_studiu;
    }

    public void setAn_studiu(Integer an_studiu) {
        this.an_studiu = an_studiu;
    }
}
