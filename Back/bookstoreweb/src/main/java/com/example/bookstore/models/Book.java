package com.example.bookstore.models;


import javax.persistence.*;

@Entity
@Table(name="book")
public class Book {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private String title;
    @Column (nullable = false)
    private String authors;
    @Column (nullable = false)
    private String title_slug;
    @Column (nullable = false)
    private String isbn13;
    @Column (nullable = false)
    private String isbn10;
    @Column (nullable = false)
    private Double price;
    @Column (nullable = false)
    private String publisher;
    @Column (nullable = false)
    private String pubdate;
    @Column (nullable = false)
    private String subjects;
    @Column (nullable = false)
    private String overwiew;
    @Column (nullable = false)
    private String synopsis;

    private String covers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getTitle_slug() {
        return title_slug;
    }

    public void setTitle_slug(String title_slug) {
        this.title_slug = title_slug;
    }

    public String getIsbn13() {
        return isbn13;
    }

    public void setIsbn13(String isbn13) {
        this.isbn13 = isbn13;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public void setIsbn10(String isbn10) {
        this.isbn10 = isbn10;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPubdate() {
        return pubdate;
    }

    public void setPubdate(String pubdate) {
        this.pubdate = pubdate;
    }

    public String getSubjects() {
        return subjects;
    }

    public void setSubjects(String subjects) {
        this.subjects = subjects;
    }

    public String getOverwiew() {
        return overwiew;
    }

    public void setOverwiew(String overwiew) {
        this.overwiew = overwiew;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getCovers() {
        return covers;
    }

    public void setCovers(String covers) {
        this.covers = covers;
    }
}
