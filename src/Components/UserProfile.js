import React from 'react'
import UserProfileHeader from './UserProfileHeader'
import ProfileBody from './ProfileBody'
function UserProfile({state}) {
  console.log(state)
  return (
    <div>
        <UserProfileHeader/>
        <ProfileBody/>
    </div>
  )
}

export default UserProfile