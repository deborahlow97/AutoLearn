package models;
import lombok.Data;

@Data
public class Path {
    private String id;
    private String name;
    private Courses courses;
    private Topic topics;
}