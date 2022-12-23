export class PostComment {
  id!:number;
  postId: number;
  ownerId: number;
  title:string;
  content:string;
  date: Date;
  upvotes:number[];
  downvotes:number[];
  edited: boolean;
  isEditing: boolean;

  constructor(
    postId: number,
    ownerId: number,
    title: string,
    content: string
  ){
    this.postId = postId;
    this.ownerId = ownerId;
    this.title = title;
    this.content = content;
    this.date = new Date();
    this.upvotes = [];
    this.downvotes = [];
    this.edited = false;
    this.isEditing = false
  }
}
