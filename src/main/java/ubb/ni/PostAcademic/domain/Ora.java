package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ore")
public class Ora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String zi;
    @Column
    private Integer oraStart;
    @Column
    private Integer oraEnd;
    @Column
    private Integer frecventa;
    @ManyToOne
    @JoinColumn
    private Sala sala;
    @ManyToMany
    @JoinColumn
    private List<Grupa> formatie;
    @ManyToOne
    @JoinColumn
    private Disciplina disciplina;
    @ManyToOne
    @JoinColumn
    private Profesor profesor;
    @Column
    @Enumerated(EnumType.STRING)
    private TipOra tipOra;

    //Do I need this?
    @Column
    private String color;

    public Ora(){

    }

    public Ora(String zi, Integer oraStart, Integer oraEnd, Integer frecventa, Sala sala, List<Grupa> formatie, Disciplina disciplina, Profesor profesor, TipOra tipOra, String color) {
        this.zi = zi;
        this.oraStart = oraStart;
        this.oraEnd = oraEnd;
        this.frecventa = frecventa;
        this.sala = sala;
        this.formatie = formatie;
        this.disciplina = disciplina;
        this.profesor = profesor;
        this.tipOra = tipOra;
        this.color = color;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZi() {
        return zi;
    }

    public void setZi(String zi) {
        this.zi = zi;
    }

    public Integer getOraStart() {
        return oraStart;
    }

    public void setOraStart(Integer oraStart) {
        this.oraStart = oraStart;
    }

    public Integer getOraEnd() {
        return oraEnd;
    }

    public void setOraEnd(Integer oraEnd) {
        this.oraEnd = oraEnd;
    }

    public Integer getFrecventa() {
        return frecventa;
    }

    public void setFrecventa(Integer frecventa) {
        this.frecventa = frecventa;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public List<Grupa> getFormatie() {
        return formatie;
    }

    public void setFormatie(List<Grupa> formatie) {
        this.formatie = formatie;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public TipOra getTipOra() {
        return tipOra;
    }

    public void setTipOra(TipOra tipOra) {
        this.tipOra = tipOra;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}

