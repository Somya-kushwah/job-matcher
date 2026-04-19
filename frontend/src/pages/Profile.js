function Profile({ user }) {
  return (
    <div className="profile">
      <h2>Welcome, {user}</h2>
      <p>Email: {user}@mail.com</p>
    </div>
  );
}

export default Profile;