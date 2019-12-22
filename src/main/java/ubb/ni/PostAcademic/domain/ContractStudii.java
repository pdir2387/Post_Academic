package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contracteStudii")
public class ContractStudii {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private Integer anStart;
    @Column
    private Integer anEnd;
    @OneToMany
    @JoinColumn
    private List<Disciplina> discipline;

    public ContractStudii(){

    }

    public ContractStudii(Integer anStart, Integer anEnd, List<Disciplina> discipline) {
        this.anStart = anStart;
        this.anEnd = anEnd;
        this.discipline = discipline;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnStart() {
        return anStart;
    }

    public void setAnStart(Integer anStart) {
        this.anStart = anStart;
    }

    public Integer getAnEnd() {
        return anEnd;
    }

    public void setAnEnd(Integer anEnd) {
        this.anEnd = anEnd;
    }

    public List<Disciplina> getDiscipline() {
        return discipline;
    }

    public void setDiscipline(List<Disciplina> discipline) {
        this.discipline = discipline;
    }
}
