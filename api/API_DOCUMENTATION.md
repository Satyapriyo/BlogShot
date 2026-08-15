# BlogShot Backend API Documentation

## Overview
Robust, scalable REST API for BlogShot blogging platform with comprehensive error handling, rate limiting, security, and logging.

## Base URL
```
http://localhost:3003/api
```

## Authentication
Most endpoints require JWT authentication via Authorization header:
```
Authorization: Bearer <token>
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success message",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errorCode": "ERROR_CODE",
  "data": null
}
```

---

## Endpoints

### Posts

#### Get All Posts (with Pagination)
```
GET /post?page=1&limit=10&sort=newest
```
**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10, max: 100) - Items per page
- `sort` (string) - newest, oldest, trending, popular
- `search` (string) - Search posts by title
- `user` (string) - Filter by author username
- `cat` (string) - Filter by category

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 42,
      "postsPerPage": 10
    }
  }
}
```

**Rate Limit:** 100 requests per 15 minutes

---

#### Search Posts
```
GET /post/search?q=javascript
```
**Query Parameters:**
- `q` (string, required, min: 2 chars) - Search query

**Response:** Array of matching posts

**Rate Limit:** 50 requests per minute

---

#### Get Single Post
```
GET /post/:id
```
**Increments view count automatically**

**Rate Limit:** 100 requests per 15 minutes

---

#### Create Post
```
POST /post
Content-Type: application/json

{
  "title": "Post Title",
  "desc": "Post description (min 10 chars)",
  "photo": "image_url",
  "username": "author_username",
  "catagories": ["tech", "javascript"]
}
```

**Validation:**
- `title` (required, max 200 chars)
- `desc` (required, min 10 chars)
- `photo` (required)
- `username` (required)
- `catagories` (optional, array)

**Rate Limit:** 10 posts per hour

---

#### Update Post
```
PUT /post/:id
Content-Type: application/json

{
  "title": "Updated title",
  "desc": "Updated description",
  "photo": "new_image_url",
  "username": "author_username"
}
```

**Authorization:** Required (post author only)

**Validation:** Same as create (all optional)

---

#### Delete Post
```
DELETE /post/:id
Content-Type: application/json

{
  "username": "author_username"
}
```

**Authorization:** Required (post author only)

---

#### Like Post
```
PUT /post/:id/like
```

**Atomically increments likes count**

**Rate Limit:** 100 requests per 15 minutes

---

### Comments

#### Get All Comments for Post
```
GET /comments/post/:postId
```

**Sorted by newest first**

---

#### Create Comment
```
POST /comments
Content-Type: application/json

{
  "postId": "post_id",
  "username": "commenter_username",
  "content": "Comment text (2-5000 chars)"
}
```

**Validation:**
- `content` (required, min 2, max 5000 chars)
- `username` (required)
- `postId` (required, valid ObjectId)

**Rate Limit:** 30 comments per hour

---

#### Delete Comment
```
DELETE /comments/:id
Content-Type: application/json

{
  "username": "commenter_username"
}
```

**Authorization:** Comment author only

---

#### Like Comment
```
PUT /comments/:id/like
```

**Atomically increments likes count**

---

### Bookmarks

#### Get User Bookmarks
```
GET /bookmarks/user/:userId
```

**Returns bookmarked posts with full details**

---

#### Create Bookmark
```
POST /bookmarks
Content-Type: application/json

{
  "userId": "user_id",
  "postId": "post_id",
  "username": "username"
}
```

**Response:** Created bookmark

---

#### Check if Post is Bookmarked
```
GET /bookmarks/check/:userId/:postId
```

**Response:**
```json
{
  "isBookmarked": true
}
```

---

#### Delete Bookmark
```
DELETE /bookmarks/post/:postId/user/:userId
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| VALIDATION_ERROR | 400 | Input validation failed |
| BAD_REQUEST | 400 | Invalid request |
| INVALID_ID | 400 | Invalid ID format |
| UNAUTHORIZED | 401 | Authentication required |
| INVALID_TOKEN | 401 | Token invalid or expired |
| FORBIDDEN | 403 | Access denied |
| NOT_FOUND | 404 | Resource not found |
| DUPLICATE_ENTRY | 409 | Resource already exists |
| CONFLICT | 409 | Conflict with existing data |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

---

## Rate Limiting

**By Endpoint:**
- General API: 100 requests/15 minutes
- Auth: 5 requests/15 minutes
- Create Post: 10 posts/hour
- Create Comment: 30 comments/hour
- Search: 50 searches/minute

**Response Headers:**
- `Retry-After` - Seconds to wait before retry (when limited)

---

## Security Features

✅ Helmet.js - Security headers
✅ CORS - Cross-origin protection
✅ Input sanitization - NoSQL injection prevention
✅ Rate limiting - DDoS protection
✅ Request size limits - 50MB max
✅ Password hashing - Bcrypt
✅ JWT tokens - Secure authentication
✅ Validation - Input validation
✅ Error handling - Safe error messages
✅ HTTPS ready - Secure transport

---

## Logging

**Log Levels:**
- `ERROR` - Critical errors
- `WARN` - Warnings
- `INFO` - General information
- `DEBUG` - Development debugging

**Log Location:** `/api/logs/` (production only)

**Logged Events:**
- Authentication attempts
- Database operations
- Errors and exceptions
- Rate limit hits
- Security violations

---

## Best Practices

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <token>
```

### Pagination
- Always use pagination for list endpoints
- Default limit: 10, Max limit: 100
- Always start at page 1

### Search
- Minimum 2 characters
- Case-insensitive
- Matches post titles only

### Error Handling
- Check `success` field first
- Use `errorCode` for programmatic handling
- Display `message` to users
- Use `data` for additional context

### Performance Tips
- Use lean queries (no full objects)
- Implement caching on client
- Batch requests when possible
- Use appropriate sort order

---

## Deployment Checklist

- [ ] Set environment variables
- [ ] Enable HTTPS
- [ ] Configure rate limiting for production
- [ ] Set up log rotation
- [ ] Configure MongoDB indexes
- [ ] Enable database backups
- [ ] Set up monitoring
- [ ] Configure CDN for images
- [ ] Enable compression
- [ ] Test error handling

---

## Support & Contact

For issues or questions, contact: support@blogshot.com
