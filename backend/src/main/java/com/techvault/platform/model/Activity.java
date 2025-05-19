package com.techvault.platform.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Quiz.class, name = "Quiz"),
        @JsonSubTypes.Type(value = Assignment.class, name = "Assignment"),
        @JsonSubTypes.Type(value = Lecture.class, name = "Lecture")
})
public abstract class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

//    @Enumerated(EnumType.STRING)
//    private ActivityType type;

    @ManyToOne
    @JsonBackReference
    private Course course;

    private int pointsAwarded;
}
