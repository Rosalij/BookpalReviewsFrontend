export interface Review {
  _id: string;
  bookId: string;
 
  reviewText: string;
  rating: number;
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt?: string;
}
