package com.mugiwara.book.history;

import com.mugiwara.book.book.Book;
import com.mugiwara.book.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookTransactionHistory extends BaseEntity {

    @Column(name = "user_id")
    private String userId;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private boolean returned;
    private boolean returnApproved;
}