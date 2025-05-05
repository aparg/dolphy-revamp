'use client'
import React, { useState, useEffect } from 'react'

function TimeAgo({ modificationTimestamp }) {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    // Parse the modification timestamp string into a Date object
    const modificationTime = new Date(modificationTimestamp)

    // Step 1: Get current time in Eastern Time (ET)
    const currentTime = new Date()
    const currentTimeET = new Date(
      currentTime.toLocaleString('en-US', { timeZone: 'America/New_York' })
    )

    // Calculate the time difference in seconds
    const timeDifferenceSeconds = Math.floor(
      (currentTimeET.getTime() - modificationTime.getTime()) / 1000
    )

    // Define time units in seconds
    const secondsInMinute = 60
    const secondsInHour = 60 * secondsInMinute
    const secondsInDay = 24 * secondsInHour

    // Determine the appropriate time unit based on the time difference
    let timeAgoString = ''
    if (isNaN(timeDifferenceSeconds)) {
      timeAgoString = 'Invalid timestamp' // Handle invalid timestamp
    } else if (timeDifferenceSeconds < secondsInMinute) {
      timeAgoString =
        timeDifferenceSeconds === 1
          ? '1 second ago'
          : `${timeDifferenceSeconds} seconds ago`
    } else if (timeDifferenceSeconds < secondsInHour) {
      const minutesAgo = Math.floor(timeDifferenceSeconds / secondsInMinute)
      timeAgoString =
        minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`
    } else if (timeDifferenceSeconds < secondsInDay) {
      const hoursAgo = Math.floor(timeDifferenceSeconds / secondsInHour)
      timeAgoString = hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`
    } else {
      const daysAgo = Math.floor(timeDifferenceSeconds / secondsInDay)
      timeAgoString = daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`
    }

    // Update the state with the calculated time ago string
    setTimeAgo(timeAgoString)
  }, [modificationTimestamp])

  return <>{timeAgo}</>
}

export default TimeAgo
