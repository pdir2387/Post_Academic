package ubb.ni.PostAcademic.domain;

import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prezente")
public class Prezenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private Integer saptamana;
    @Column
    private Boolean prezent;
    @ManyToOne
    @JoinColumn
    private Disciplina disciplina;
    @Column
    private TipOra tipOra;
    @ManyToOne
    @JoinColumn
    private Student student;

    public Prezenta(){

    }

    public Prezenta(Integer saptamana, Boolean prezent, Disciplina disciplina, TipOra tipOra, Student student) {
        this.saptamana = saptamana;
        this.prezent = prezent;
        this.disciplina = disciplina;
        this.tipOra = tipOra;
        this.student = student;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSaptamana() {
        return saptamana;
    }

    public void setSaptamana(Integer saptamana) {
        this.saptamana = saptamana;
    }

    public Boolean getPrezent() {
        return prezent;
    }

    public void setPrezent(Boolean prezent) {
        this.prezent = prezent;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public TipOra getTipOra() {
        return tipOra;
    }

    public void setTipOra(TipOra tipOra) {
        this.tipOra = tipOra;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}