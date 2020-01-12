package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "note")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private Integer saptamana;
    @ManyToOne
    @JoinColumn
    private Ora ora;
    @Column
    private Integer nota;
    @Column
    private String notita;
    @ManyToOne
    @JoinColumn
    private Student student;

    public Nota(){

    }

    public Nota(Integer saptamana, Ora ora, Integer nota, String notita, Student student) {
        this.saptamana = saptamana;
        this.ora = ora;
        this.nota = nota;
        this.notita = notita;
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

    public Ora getOra() {
        return ora;
    }

    public void setOra(Ora ora) {
        this.ora = ora;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getNotita() {
        return notita;
    }

    public void setNotita(String notita) {
        this.notita = notita;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}