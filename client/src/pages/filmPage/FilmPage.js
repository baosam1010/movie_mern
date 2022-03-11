import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Field, Form, Formik, } from 'formik';
import { connect } from 'react-redux';
import filmApi from '../../apis/filmApi';
import io from 'socket.io-client';
import classnames from 'classname';

let socket = io('localhost:5000');


function FilmPage({ info }) {
  const [posts, setPosts] = useState([]);
  const [film, setFilm] = useState();
  const param = useParams();
  const iframeRef = useRef();

  const { userAuthenticated, user } = info;
  let name;

  if (userAuthenticated && user !== null) {
    const { username } = info.user;
    name = username;
  };

  const initialVale = {
    content: '',
    username: '',
    filmId: param.slug,
  };

  useEffect(() => {
    const getFilm = async () => {
      try {
        const resp = await filmApi.getOne(param.slug);
        setFilm(resp.film)
      } catch (error) {
        throw error
      }
    };
    getFilm();
    return () => {
      setFilm()
    };
  }, [param]);


  useEffect(() => {

    socket.emit('join', { room: param.slug, user }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {

    }
  }, [name, param.slug, user]);

  useEffect(() => {
    socket.on('message', (values) => {
      setPosts(posts => [...posts, values])
    });

    socket.on('messages', (messages) => {
      setPosts([...messages])
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showFilm = (film) => {
    const { poster, filmName, url, year, actorName, country, description, episode } = film;
    let html = null;

    const showActor = (actorName) => {
      let arr = actorName[0].split(', ');
      let result = null;
      result = arr.map((item, index) => {
        return (<span key={item + index}>{item}</span>)
      })
      return result;
    };

    const setUrl = (url, e) => {
      if (url === 1) {
        window.scrollTo(0, 140);
        iframeRef.current.src += "?autoplay=1";
      } else {
        const currentAct = document.getElementsByClassName('actVideo');
        currentAct[0].classList.remove('actVideo');

        e.target.classList.add("actVideo")
        console.log('e:', e.target.className);

        window.scrollTo(0, 140);
        iframeRef.current.src = url;
        iframeRef.current.src += "?autoplay=1";
      }
    };

    html = (
      <>
        {/* Film video */}
        <div className="film_video">
          {url ? (
            <iframe
              src={url}
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              ref={iframeRef}

            >
            </iframe>
          ) :
            ((url === "" && episode.length > 0) && (
              <>
                <iframe
                  src={episode[0].episodeUrl}
                  title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  ref={iframeRef}

                >
                </iframe>
                <div className="list_video">
                  <h3> Tập Phim: </h3>
                  <ul>
                    {episode.map((item, index) => {
                      const { episodeUrl, episodeName } = item;
                      return (
                        <li
                          key={episodeUrl}
                          onClick={(e) => { setUrl(episodeUrl, e) }}
                          className={classnames(index === 0 ? "actVideo" : "", "item_video")}
                        >
                          {episodeName}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </>
            ))
          }
        </div>

        {/* Film infor */}
        <div className="film_info">
          <div className="film_name">
            <img src={poster} alt="imgmovie" />
            <div>
              <h1>{filmName}</h1>
              <button type="button" onClick={() => setUrl(1, null)}>Xem Phim</button>
            </div>
          </div>

          <ul className="film_info_detail">
            <li>
              <label>Năm phát hành:</label>
              <div>
                <span>{year}</span>
              </div>
            </li>
            <li>
              <label>Đạo diễn:</label>
              <div>
                <span>Tom Alasa</span>
              </div>
            </li>
            <li>
              <label>Diễn viên:</label>
              <div>
                {showActor(actorName)}
              </div>
            </li>
            <li>
              <label>Thời lượng:</label>
              <div>
                <span> 81 phút</span>
              </div>
            </li>
            <li>
              <label>Quốc gia:</label>
              <div>
                <span>{country}</span>
              </div>
            </li>
          </ul>
          <div className="film_desc">
            <h2>Nội dung phim:</h2>
            <p>
              <span style={{ marginRight: "8px" }}>{filmName}</span>
              {description}
            </p>
          </div>
        </div>
      </>
    )
    return html;
  };
  const showPosts = (posts) => {
    let html = null;
    if (posts) {
      html = posts.map((post, index) => {
        const { content, username, id } = post
        return (
          <li key={id + username + index}>
            <div className="user">
              <img src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-22.jpg" alt="imguser" />
            </div>
            <div className="content">
              <h4>{username}</h4>
              <p>{content}</p>
            </div>
          </li>
        )
      })
    }
    return html;
  };

  return (
    <div className="film">
      <div className="container">
        {film && showFilm(film)}
        {/* Comment */}
        <div className="film_chat">
          <h1>Bình luận:</h1>
          <div className="film_form">
            <Formik
              initialValues={initialVale}
              onSubmit={(values, actions) => {
                if (name) {
                  values = { ...values, username: name }
                  socket.emit('sendMessage', values);
                } else {
                  alert('Bạn cần đăng nhập để bình luận');
                }
                actions.resetForm();
              }}
            >
              {() => (
                <Form className="form_wrapper">
                  <Field type="text" name="content" placeholder="Hãy viết gì đó..." />
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </div>

          <ul className="chat_list">
            {showPosts(posts)}
          </ul>
        </div>

      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    info: state.user,
  }
}
export default connect(mapStateToProps, null)(FilmPage)