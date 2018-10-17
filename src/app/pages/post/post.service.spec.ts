import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { PostService } from './post.service';
import { HttpClient } from 'selenium-webdriver/http';

describe('PostService', () => {

  let service: PostService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const demoPosts = [{
      userId: 1,
      id: 1,
      title: 'testTitle',
      body: 'testBody'
    }, {
      userId: 2,
      id: 2,
      title: 'testTitle',
      body: 'testBody'
    }];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PostService]
  }));
  beforeEach(() => {
    service = TestBed.get(PostService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getObservableValue should return value from observable', () => {
    service.getAll().subscribe(value => {
      expect(value).toBe('observable value');
    });
  });

  it('should get posts from the server', () => {


    service.getAll().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(demoPosts);
    });

    const request = httpTestingController.expectOne(service.postsUrl);
    expect(request.request.method).toBe('GET');

    request.flush(demoPosts);
  });

  it('should get single post from the server', () => {

    service.getPost(2).subscribe(post => {
      expect(post).toEqual(demoPosts[0]);
    });

    const request = httpTestingController.expectOne(`${service.postsUrl}/2`);
    expect(request.request.method).toBe('GET');

    request.flush(demoPosts[0]);
  });


  it('should delete post using id', () => {
    const mockId = 5;
    service.deletePost(mockId).subscribe(
      response => expect(response).toEqual(mockId),
      fail
    );
    // Receive DELETE request
    const req = httpTestingController.expectOne(`${service.postsUrl}/5`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockId);
  });

  it('should update post', () => {
    service.managePost(demoPosts[0], false).subscribe(
      response => expect(response).toEqual(demoPosts[0]),
      fail
    );

    const req = httpTestingController.expectOne(`${service.postsUrl}/${demoPosts[0].id}`);
    expect(req.request.method).toEqual('PATCH');

    req.flush(demoPosts[0]);
  });
  it('should add post', () => {
    service.managePost(demoPosts[0], true).subscribe(
      response => expect(response).toEqual(demoPosts[0]),
      fail
    );

    const req = httpTestingController.expectOne(service.postsUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(demoPosts[0]);
  });



});
