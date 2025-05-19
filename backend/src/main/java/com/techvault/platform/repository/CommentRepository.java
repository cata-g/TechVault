package com.techvault.platform.repository;

import com.techvault.platform.model.Comment;
import com.techvault.platform.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByActivity(Activity activity);
}
