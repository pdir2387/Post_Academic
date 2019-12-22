package ubb.ni.PostAcademic.domain;

import javax.persistence.*;

@Entity
@Table(name = "profesori")
public class Profesor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column//(unique=true)
    private String username;
    @Column
    private String nume;
    @Column
    private AccountType accountType;

}