import React, { useEffect, useState } from "react";
import Records from "../data/records.json";
import { TfiClip } from "react-icons/tfi";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

function Wrapper() {
  const [selected, setSelected] = useState(null);
  const [users, setUsers] = useState([]);

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "selectAll") {
      const checkedValue = users.map((record) => {
        return { ...record, isChecked: checked };
      });
      setUsers(checkedValue);
    } else {
      const checkedValue = users.map((record) =>
        name == record.id ? { ...record, isChecked: checked } : record
      );
      setUsers(checkedValue);
    }
  };

  const handleDelete = () => {
    const checkedInput = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].isChecked === true) {
        checkedInput.push(users[i].id);
        const newRecords = users.filter(
          (user) => !checkedInput.includes(user.id)
        );
        setUsers(newRecords);
      }
    }
  };

  useEffect(() => {
    setUsers(Records);
  }, []);

  return (
    <div className="wrapper">
      <header>
        <input
          type="checkbox"
          name="selectAll"
          checked={!users.some((record) => record?.isChecked !== true)}
          onChange={handleChange}
        />
        <button className="save-button"> SAVE </button>
        <button className="manage-button"> MANAGE FILES </button>
        <div className="vertical-divider"></div>
        <button
          className="delete-button"
          onClick={() => {
            handleDelete();
          }}
        >
          DELETE
        </button>

        <nav>
          <ul>
            <button className="page-button">&#8249; </button>
            <li className="page"> 50 of 150 </li>
            <button className="page-button">&#8250; </button>
          </ul>
        </nav>
      </header>

      <hr />

      <main>
        <div className="upper-row">
          <h3>Unread</h3>
        </div>

        <div className="records-container">
          {users.map((record, i) => {
            const arr = users[i].tags.split(",");
            const names = users[i].sender_name.split(" ");
            const letter = names[1].split("");
            const display_mon = users[i].date.split(" ");
            const display_day = display_mon[1].split(",");
            const rand = Math.floor(Math.random() * 10);

            return (
              <div
                className={
                  selected == i
                    ? "expandable-header-show"
                    : "expandable-header-hide"
                }
              >
                <button className="expandable-button">
                  <input
                    type="checkbox"
                    name={record.id}
                    checked={record?.isChecked || false}
                    onChange={handleChange}
                  />
                  <div className="active-circle" onClick={() => toggle(i)}>
                    &#9679;{" "}
                  </div>
                  <div className="date" onClick={() => toggle(i)}>
                    <h4>{display_day[0]}</h4>
                    <h3>{display_mon[0]}</h3>
                  </div>
                  <div className="profile" onClick={() => toggle(i)}>
                    {users[i].sender_name[0]}
                    {letter[0]}
                  </div>
                  <div className="subject-heading" onClick={() => toggle(i)}>
                    <h1>{users[i].subject}</h1>
                    <ul>
                      <li>{users[i].sender_name}</li>
                      <li className="sub">{users[i].sender_email}l</li>
                      <li className="sub">{users[i].date}</li>
                      <div className="vertical-divider"></div>
                      <li className="sub">{users[i].date}</li>
                      <div className="vertical-divider"></div>
                      <span className="clip-icon">
                        <TfiClip></TfiClip>
                      </span>
                      <li className="clip">{rand}</li>
                    </ul>
                  </div>
                  <div className="tag-headcontainer" onClick={() => toggle(i)}>
                    <div className={selected == i ? "tags-hide" : "tags"}>
                      {arr[0]}
                    </div>
                    <div className={selected == i ? "tags-hide" : "tags"}>
                      {arr[1]}
                    </div>
                    <div className={selected == i ? "tags-hide" : "tags"}>
                      {arr[2]}
                    </div>
                    <div className={selected == i ? "tags-hide" : "tags"}>
                      {arr.length - 3}+
                    </div>
                  </div>
                  <h3 className="indicator">
                    {selected == i ? (
                      <BiSolidUpArrow></BiSolidUpArrow>
                    ) : (
                      <BiSolidDownArrow></BiSolidDownArrow>
                    )}
                  </h3>
                </button>
                <div>
                  <div className="long-h-divider"></div>
                  <section className="sender-header">
                    <div>
                      <h3>{users[i].sender_name}</h3>
                      <h4>{users[i].date}</h4>
                    </div>
                    <div
                      className={
                        selected == i ? "tag-container" : "tag-container-hide"
                      }
                    >
                      <div className="tags">{arr[0]}</div>
                      <div className="tags">{arr[1]}</div>
                      <div className="tags">{arr[2]}</div>
                      <div className="tags">{arr[3]}</div>
                      <div className="tags">{arr[4]}</div>
                      <div className="tags">{arr[5]}</div>
                      <div className="tags">{arr[6]}</div>
                      <div className="tags">{arr[7]}</div>
                      <div className="tags">{arr[8]}</div>
                      <div className="tags">{arr[9]}</div>
                    </div>
                  </section>
                  <section className="content">{users[i].content}</section>
                  <section className="message-container">
                    <div className="short-h-divider"></div>
                    <div>Forwarded message</div>
                    <div className="short-h-divider"></div>
                  </section>
                  <section className="details-container">
                    <div className="sender-details">
                      From: {users[i].sender_name}{" "}
                      <a href={users[i].sender_email}>
                        {users[i].sender_email}
                      </a>
                    </div>
                    <div className="date-details">
                      Date: Mon, Feb 8, 2021 at 4:36PM
                    </div>
                    <div className="subject-details">
                      New project 3 {"NEW - 10707 / 1715"}
                    </div>
                    <div className="receiver=details">
                      To: Isabel Bowen{" "}
                      <a href="sbtest.isabel@gmail.com">
                        sbtest.isabel@gmail.com
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Wrapper;
