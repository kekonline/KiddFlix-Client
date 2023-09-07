# KiddFlix

## [See the App!](https://kiddflix.netlify.app/)

![App Logo](https://raw.githubusercontent.com/kekonline/KiddFlix-Client/master/src/assets/KiddFlix_Logo.png)

## Description

Empowering parents with a personalized app, curate tailored playlists for your child's learning and entertainment, ensuring a safe and enriching digital experience.

#### [Client Repo here](https://github.com/kekonline/KiddFlix-Client)

#### [Server Repo here](https://github.com/kekonline/KiddFlix-Server)

## Backlog Functionalities

the ability to subscribe to YouTube channels and add the videos automatically

## Technologies used

HTML, CSS, Javascript, Express, React, axios, bcryptjs, cloudinary, xpress-jwt,mongoose, multer, Materia UI, react-player

# Client Structure

## User Stories

- **404 Page**

  - As a user, I want to see a nice 404 page when I navigate to a page that doesn’t exist, so that I know it was my mistake.

- **500 Page**

  - As a user, I want to see a well-designed error page when the application encounters an internal error, so that I know it's not my fault.

- **Homepage Access**

  - As a user, I want to access the homepage to understand what the app is about and proceed with login or signup.

- **Sign Up**

  - As a user, I want to be able to sign up on the webpage so that I can explore and interact with all available features.

- **Login**

  - As a user, I want to be able to log in on the webpage so that I can access my account and saved preferences.

- **Logout**

  - As a user, I want to be able to log out from the webpage so that I can ensure the security of my account.

- **Access Parent Dashboard**

  - As a parent user, I want to access the parent dashboard for managing child accounts and settings.

- **View Parent Profile**

  - As a parent user, I want to view and manage my parent profile details for accurate account information.

- **Edit Child Account**

  - As a parent user, I want to edit the details of my child's account, ensuring accuracy and relevance.

- **Edit Playlist (with Child Name and ID)**

  - As a parent user, I want to edit a playlist associated with a specific child, tailoring it to their preferences.

- **Change Parent Password**

  - As a parent user, I want to change my password for enhanced account security.

- **Edit Video in Playlist (with Playlist Name and ID)**

  - As a parent user, I want to edit a video within a specific playlist, customizing the content for my child.

- **Access Parent Tutorial**

  - As a parent user, I want to access a tutorial or guide to assist me in effectively using the app.

- **View Child Playlist**

  - As a child user, I want to view my personalized playlist for a curated entertainment experience.

- **View User's Profile**

  - As a child user, I want to view my profile details to ensure accurate information representation.

- **Access Parent Login (for Child Users)**

  - As a child user, I want to access the parent login section if needed, for specific functionalities requiring parent permissions.

- **View Videos in a Playlist (with Playlist Name and ID)**

  - As a child user, I want to view videos within a specific playlist, enjoying a tailored entertainment experience.

- **Play Video (with Link and Video ID)**

  - As a child user, I want to play a specific video for entertainment or educational purposes.

- **View Videos by Category**

  - As a child user, I want to browse videos by specific categories to find content that interests me.

- **Edit Child Account (with Child ID)**

  - As a parent user, I want to edit the details of a specific child's account, ensuring accuracy and relevance.

- **View Error Page**

  - As a user, I want to view a user-friendly error page when an unexpected error occurs.

- **Navigate Back to Home (Fallback)**
  - As a user, I want to be redirected to the homepage if I navigate to an undefined route.

## Client Routes

**NOTE -** Use below table to list your frontend routes

| Path                                           | Page                 | Components                               | Permissions    | Behavior                                                             |
| ---------------------------------------------- | -------------------- | ---------------------------------------- | -------------- | -------------------------------------------------------------------- |
| `/`                                            | Home                 | `<Navbar />`, `<Home />`                 | `<IsKickBack>` | Display home page                                                    |
| `/signin`                                      | SignIn               | `<Navbar />`, `<SignIn />`               | `<IsKickBack>` | Display sign-in page                                                 |
| `/parent/home`                                 | ParentHome           | `<Navbar />`, `<ParentHome />`           | `<IsParent>`   | Display parent's home page                                           |
| `/parent/profile`                              | ParentProfile        | `<Navbar />`, `<ParentProfile />`        | `<IsParent>`   | Display parent's profile page                                        |
| `/parent/child/edit`                           | ChildEdit            | `<Navbar />`, `<ChildEdit />`            | `<IsParent>`   | Display child edit page for parent                                   |
| `/parent/playlist/edit/:childName/:childId`    | PlaylistEdit         | `<Navbar />`, `<PlaylistEdit />`         | `<IsParent>`   | Display playlist edit page for parent                                |
| `/parent/password-change`                      | ParentPasswordChange | `<Navbar />`, `<ParentPasswordChange />` | `<IsParent>`   | Display password change page for parent                              |
| `/parent/video/edit/:playlistName/:playlistId` | VideoEdit            | `<Navbar />`, `<VideoEdit />`            | `<IsParent>`   | Display video edit page for parent                                   |
| `/parent/tutorial`                             | ParentTutorial       | `<Navbar />`, `<ParentTutorial />`       | `<IsParent>`   | Display tutorial page for parent                                     |
| `/playlist`                                    | ChildPlaylist        | `<Navbar />`, `<ChildPlaylist />`        | `<IsChild>`    | Display child's playlist page                                        |
| `/users-profile`                               | UsersProfile         | `<Navbar />`, `<UsersProfile />`         | `<IsChild>`    | Display user's profile page                                          |
| `/parent-login`                                | ParentLogin          | `<Navbar />`, `<ParentLogin />`          | `<IsChild>`    | Display parent login page for child                                  |
| `/playlist/:playlistName/:playlistId`          | ChildVideoInPlaylist | `<Navbar />`, `<ChildVideoInPlaylist />` | `<IsChild>`    | Display videos in a specific playlist for child                      |
| `/playlist/video/:link/:videoId`               | ChildVideoPlay       | `<Navbar />`, `<ChildVideoPlay />`       | `<IsChild>`    | Play a specific video for child                                      |
| `/video/:category`                             | ChildVideoCategory   | `<Navbar />`, `<ChildVideoCategory />`   | `<IsChild>`    | Display videos by category for child                                 |
| `/parent/child/edit/:childId`                  | ChildEditCard        | `<Navbar />`, `<ChildEditCard />`        | `<IsParent>`   | Display child edit card page for parent                              |
| `/error`                                       | Error                | `<Navbar />`, `<Error />`                | public         | Display error page                                                   |
| `*`                                            | NotFound             | `<Navbar />`, `<NotFound />`             | public         | Fallback route - Display a "not found" page for any unmatched routes |

## Other Components

- Navbar
- IsChild
- IsParent
- ChildVideoPlay
- ParentTutorial
- IsKickBack

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - game.filter(type, status)
  - game.detail(id)
  - game.add(id)
  - game.delete(id)
  - game.update(id)
- External API
  - gameApi.details
  - gameApi.list

## Context

- auth.context

## Links

### Collaborators

[kekonline](https://github.com/kekonline)

### Project

[Repository Link Client](https://github.com/kekonline/KiddFlix-Client)

[Repository Link Server](https://github.com/kekonline/KiddFlix-Server)

[Deploy Link](https://kiddflix.netlify.app/)

### Trello

[Link to your trello board](https://trello.com/b/6DHgdgvs/kiddflix)

### Slides

[Slides Link](https://docs.google.com/presentation/d/12SMBXdSX9TFTras3adn3-_gTpP47OKBg2CPeZMjvA8k/edit?usp=sharing)
