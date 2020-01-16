package ubb.ni.PostAcademic.domain;


import javax.persistence.*;

@Entity
@Table(name = "cladiri")
public class Cladire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;
    @Column
    private Double latitudine;
    @Column
    private Double longitudine;

    public Cladire() {

    }

    public Cladire(String nume, Double latitudine, Double longitudine) {
        this.nume = nume;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
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

    public Double getLatitudine() {
        return latitudine;
    }

    public void setLatitudine(Double latitudine) {
        this.latitudine = latitudine;
    }

    public Double getLongitudine() {
        return longitudine;
    }

    public void setLongitudine(Double longitudine) {
        this.longitudine = longitudine;
    }
}
