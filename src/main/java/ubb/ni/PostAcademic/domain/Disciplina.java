package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "discipline")
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;
    @Column
    private ArrayList<Ora> ore;
    @Column
    private Integer semestru;
    @Column
    private Integer credite;
    @Column
    @Enumerated(EnumType.STRING)
    private TipDisciplina tipDisciplina;

    public Disciplina(){

    }

    public Disciplina(String nume, ArrayList<Ora> ore, Integer semestru, Integer credite, TipDisciplina tipDisciplina) {
        this.nume = nume;
        this.ore = ore;
        this.semestru = semestru;
        this.credite = credite;
        this.tipDisciplina = tipDisciplina;
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

    public ArrayList<Ora> getOre() {
        return ore;
    }

    public void setOre(ArrayList<Ora> ore) {
        this.ore = ore;
    }

    public Integer getSemestru() {
        return semestru;
    }

    public void setSemestru(Integer semestru) {
        this.semestru = semestru;
    }

    public Integer getCredite() {
        return credite;
    }

    public void setCredite(Integer credite) {
        this.credite = credite;
    }

    public TipDisciplina getTipDisciplina() {
        return tipDisciplina;
    }

    public void setTipDisciplina(TipDisciplina tipDisciplina) {
        this.tipDisciplina = tipDisciplina;
    }
}