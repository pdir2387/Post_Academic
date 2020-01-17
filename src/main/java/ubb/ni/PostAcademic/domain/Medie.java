package ubb.ni.PostAcademic.domain;

import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medii")
public class Medie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private Integer an_universitar;
    @Column
    private Integer smestru;
    @Column
    private Integer nota;
    @ManyToOne
    @JoinColumn
    private Student student;
    @ManyToOne
    @JoinColumn
    private Disciplina disciplina;
    @Column
    private Boolean promovat;

    public Medie(){

    }

    public Medie(Integer an_universitar, Integer smestru, Integer nota, Student student, Disciplina disciplina, Boolean promovat) {
        this.an_universitar = an_universitar;
        this.smestru = smestru;
        this.nota = nota;
        this.student = student;
        this.disciplina = disciplina;
        this.promovat = promovat;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAn_universitar() {
        return an_universitar;
    }

    public void setAn_universitar(Integer an_universitar) {
        this.an_universitar = an_universitar;
    }

    public Integer getSmestru() {
        return smestru;
    }

    public void setSmestru(Integer smestru) {
        this.smestru = smestru;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public Boolean getPromovat() {
        return promovat;
    }

    public void setPromovat(Boolean promovat) {
        this.promovat = promovat;
    }
}