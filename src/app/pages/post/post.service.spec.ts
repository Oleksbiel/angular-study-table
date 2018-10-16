import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { PostService } from './post.service';

describe('PostService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PostService]
  }));

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });
  // it('should get all data', () => {
  //   const service: PostService = TestBed.get(PostService);
  //   expect(service).toBeTruthy();
  // });

  it('#getObservableValue should return value from observable', () => {
    const service: PostService = TestBed.get(PostService);
    service.getAll().subscribe(value => {
      expect(value).toBe('observable value');
    });
  });

  it('should get posts', inject([PostService, HttpTestingController], (service: PostService , backend: HttpTestingController) => {
    const mockPosts = [{
        userId: 1,
        id: 5,
        title: 'aaaaa222',
        body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'
      }];

    service.getAll().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    backend.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/posts'
    }).flush(mockPosts);

  }));

  it('should get posts', inject([PostService, HttpTestingController], (service: PostService , backend: HttpTestingController) => {
    const mockPost = {
        userId: 1,
        id: 5,
        title: 'aaaaa222',
        body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'
      };

    service.getPost(5).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    backend.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/posts/5'
    }).flush(mockPost);

  }));


});
