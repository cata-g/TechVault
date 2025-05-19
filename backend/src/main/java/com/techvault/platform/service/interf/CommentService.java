package com.techvault.platform.service.interf;

import com.techvault.platform.model.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    Comment addComment(Comment comment);
    Optional<Comment> getCommentById(Long id);
    List<Comment> getAllComments();
    void deleteComment(Long id);
}
