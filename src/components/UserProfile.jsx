import React from 'react';

// Demonstrates: Props, Destructuring (in function parameters and inside), Template Literals,
// Conditional Rendering (Ternary operator and Logical &&), Optional Chaining, Default Prop Values (via default parameter)
function UserProfile({
  user = { name: "Guest", roles: [], profile: {} }, // Default value for user prop
  showFullProfile = true
}) {
  // Destructuring props further, and user object
  const { name, age, roles, profile, email } = user;
  const { bio, avatarUrl, socialLinks } = profile || {}; // Optional chaining not strictly needed here due to default prop, but good practice if profile could be null/undefined

  const defaultAvatar = 'https://via.placeholder.com/100';

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px' }}>
      {/* Template Literal for greeting */}
      <h2>{`User: ${name}`}</h2>

      {/* Optional Chaining and Nullish Coalescing for avatar */}
      <img
        src={avatarUrl ?? defaultAvatar}
        alt={`${name}'s avatar`}
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />

      {/* Conditional rendering (&&) for age - only show if age is provided and is a positive number */}
      {typeof age === 'number' && age > 0 && <p>{`Age: ${age}`}</p>}

      {/* Conditional rendering (&&) for email */}
      {email && <p>{`Email: ${email}`}</p>}

      {/* Conditional rendering (ternary) for roles */}
      {roles && roles.length > 0 ? (
        <div>
          <strong>Roles:</strong>
          <ul>
            {/* Array map() to render a list */}
            {roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No roles assigned.</p>
      )}

      {/* Conditional rendering (&&) for full profile details */}
      {showFullProfile && (
        <div>
          <h4>Profile Details:</h4>
          {/* Optional chaining for bio */}
          <p>Bio: {bio || 'No bio available.'}</p>

          {/* Optional chaining for social links */}
          {socialLinks && (socialLinks.twitter || socialLinks.linkedin) ? (
            <div>
              <p>Social:</p>
              {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
              {socialLinks.linkedin && <span style={{margin: '0 5px'}}>|</span>}
              {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            </div>
          ) : (
            <p>No social links provided.</p>
          )}
        </div>
      )}

      {/* Example of false, null, undefined not rendering */}
      <div>{false && <p>This is false, not rendered</p>}</div>
      <div>{null && <p>This is null, not rendered</p>}</div>
      <div>{undefined && <p>This is undefined, not rendered</p>}</div>
      <div>{0 && <p>Careful: This is 0, it will render as '0' if not handled by boolean conversion</p>}</div>
      {/* Correct way for 0 with && */}
      <div>{Boolean(0) && <p>This is Boolean(0), not rendered</p>}</div>


    </div>
  );
}

export default UserProfile;
