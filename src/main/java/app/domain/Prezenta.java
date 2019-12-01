package app.domain;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "prezente")
public class Prezenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private Date data;
    @Column
    private Long ora;
    @Column
    private Long student;

    public Prezenta() {}
    public Prezenta(Long id, Date data, Long ora, Long student) {
        this.id = id;
        this.data = data;
        this.ora = ora;
        this.student = student;
    }

    public Long getStudent() {
        return student;
    }

    public void setStudent(Long student) {
        this.student = student;
    }

    public Long getOra() {
        return ora;
    }

    public void setOra(Long ora) {
        this.ora = ora;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String toJson() {
        return "{ \"id\" : \"" + id + "\", \"data\" : " + data + ", \"ora\" : " + ora + ", \"student\" : " + student + "  }";
    }
}

