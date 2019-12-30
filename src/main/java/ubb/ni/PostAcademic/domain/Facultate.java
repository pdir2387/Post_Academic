package ubb.ni.PostAcademic.domain;

import javax.persistence.*;

@Entity
@Table(name = "facultati")
public class Facultate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;

    public Facultate(){

    }

    public Facultate(String nume) {
        this.nume = nume;
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
}
