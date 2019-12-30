package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "discipline")
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;
    @OneToMany
    @JoinColumn
    private List<Ora> ore;
    @Column
    private Integer semestru;
    @Column
    private Integer credite;
    @Column
    @Enumerated(EnumType.STRING)
    private TipDisciplina tipDisciplina;
    @ManyToOne
    @JoinColumn
    private Facultate facultate;
    @ManyToOne
    @JoinColumn
    private Specializare specializare;
    @Column
    private String codDisciplina;
    @Column
    private String pachet;
    @Column
    private String numar_locuri;
    @Column
    private Integer numar_studenti_inscrisi;

    public Disciplina(){

    }

    public Disciplina(String nume, List<Ora> ore, Integer semestru, Integer credite, TipDisciplina tipDisciplina, Facultate facultate, Specializare specializare, String codDisciplina, String pachet, String numar_locuri, Integer numar_studenti_inscrisi) {
        this.nume = nume;
        this.ore = ore;
        this.semestru = semestru;
        this.credite = credite;
        this.tipDisciplina = tipDisciplina;
        this.facultate = facultate;
        this.specializare = specializare;
        this.codDisciplina = codDisciplina;
        this.pachet = pachet;
        this.numar_locuri = numar_locuri;
        this.numar_studenti_inscrisi = numar_studenti_inscrisi;
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

    public List<Ora> getOre() {
        return ore;
    }

    public void setOre(List<Ora> ore) {
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

    public Facultate getFacultate() {
        return facultate;
    }

    public void setFacultate(Facultate facultate) {
        this.facultate = facultate;
    }

    public Specializare getSpecializare() {
        return specializare;
    }

    public void setSpecializare(Specializare specializare) {
        this.specializare = specializare;
    }

    public String getCodDisciplina() {
        return codDisciplina;
    }

    public void setCodDisciplina(String codDisciplina) {
        this.codDisciplina = codDisciplina;
    }

    public String getPachet() {
        return pachet;
    }

    public void setPachet(String pachet) {
        this.pachet = pachet;
    }

    public String getNumar_locuri() {
        return numar_locuri;
    }

    public void setNumar_locuri(String numar_locuri) {
        this.numar_locuri = numar_locuri;
    }

    public Integer getNumar_studenti_inscrisi() {
        return numar_studenti_inscrisi;
    }

    public void setNumar_studenti_inscrisi(Integer numar_studenti_inscrisi) {
        this.numar_studenti_inscrisi = numar_studenti_inscrisi;
    }
}