import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostComment } from '../Classes/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  x!:PostComment;

  apiUrl = 'http://localhost:3000/comments';

  getAllComments(): Observable<PostComment[]>{
    return this.http.get<PostComment[]>(this.apiUrl)
  }

  getCommentById(id: Number): Observable<PostComment> {
    return this.http.get<PostComment>('http://localhost:3000/comments/' + id);
  }

  addComment(comment: PostComment): Observable<PostComment> {
    return this.http.post<PostComment>(this.apiUrl, comment);
  }

  editComment(comment: PostComment): Observable<PostComment> {
    return this.http.patch<PostComment>(this.apiUrl + '/' + comment.id, comment);
  }

  deleteComment(comment: PostComment): Observable<PostComment> {
    return this.http.delete<PostComment>(this.apiUrl + '/' + comment.id);
  }

  getCommentByPost(postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(this.apiUrl + '/?postId=' + postId);
  }

}
