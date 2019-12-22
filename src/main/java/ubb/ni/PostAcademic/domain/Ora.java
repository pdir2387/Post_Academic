package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

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
    private LocalDateTime oraStart;
    @Column
    private LocalDateTime oraEnd;
    @Column
    private Integer frecventa;
    @ManyToOne
    @JoinColumn
    private Sala sala;
    @Column
    private ArrayList<String> formatie;
    @Column
    private String tipul;
    @ManyToOne
    @JoinColumn
    private Disciplina disciplina;
    @ManyToOne
    @JoinColumn
    private Profesor profesor;

    public Ora(){

    }

    public Ora(String zi, LocalDateTime oraStart, LocalDateTime oraEnd, Integer frecventa, Sala sala, ArrayList<String> formatie, String tipul, Disciplina disciplina, Profesor profesor) {
        this.zi = zi;
        this.oraStart = oraStart;
        this.oraEnd = oraEnd;
        this.frecventa = frecventa;
        this.sala = sala;
        this.formatie = formatie;
        this.tipul = tipul;
        this.disciplina = disciplina;
        this.profesor = profesor;
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

    public LocalDateTime getOraStart() {
        return oraStart;
    }

    public void setOraStart(LocalDateTime oraStart) {
        this.oraStart = oraStart;
    }

    public LocalDateTime getOraEnd() {
        return oraEnd;
    }

    public void setOraEnd(LocalDateTime oraEnd) {
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

    public ArrayList<String> getFormatie() {
        return formatie;
    }

    public void setFormatie(ArrayList<String> formatie) {
        this.formatie = formatie;
    }

    public String getTipul() {
        return tipul;
    }

    public void setTipul(String tipul) {
        this.tipul = tipul;
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
}

