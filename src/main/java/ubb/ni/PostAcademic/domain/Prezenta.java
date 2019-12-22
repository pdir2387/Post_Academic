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
    private LocalDateTime data;
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

    public Prezenta(LocalDateTime data, Boolean prezent, Ora ora, Student student) {
        this.data = data;
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

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
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