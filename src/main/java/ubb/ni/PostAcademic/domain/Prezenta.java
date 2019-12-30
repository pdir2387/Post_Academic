package ubb.ni.PostAcademic.domain;

import com.sun.org.apache.xpath.internal.operations.Bool;
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
    private Ora ora;
    @ManyToOne
    @JoinColumn
    private Student student;

    public Prezenta(){

    }

    public Prezenta(Integer saptamana, Boolean prezent, Ora ora, Student student) {
        this.saptamana = saptamana;
        this.prezent = prezent;
        this.ora = ora;
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

    public Ora getOra() {
        return ora;
    }

    public void setOra(Ora ora) {
        this.ora = ora;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}