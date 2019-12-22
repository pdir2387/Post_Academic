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
    private LocalDateTime data;
    @ManyToOne
    @JoinColumn
    private Ora ora;
    @Column
    private Integer nota;
    @Column
    private String notita;

    public Nota(){

    }

    public Nota(LocalDateTime data, Ora ora, Integer nota, String notita) {
        this.data = data;
        this.ora = ora;
        this.nota = nota;
        this.notita = notita;
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
}