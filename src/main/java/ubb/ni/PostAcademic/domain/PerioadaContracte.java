package ubb.ni.PostAcademic.domain;


import javax.persistence.*;

@Entity
@Table(name = "perioada")
public class PerioadaContracte
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private Integer nr;

    public PerioadaContracte()
    {

    }

    public PerioadaContracte(Integer nr)
    {
        this.nr = nr;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public Integer getNr()
    {
        return nr;
    }

    public void setNr(Integer nr)
    {
        this.nr = nr;
    }
}

