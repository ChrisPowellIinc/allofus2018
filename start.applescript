#!/usr/bin/osascript
# The list of commands to run in each tab of the terminal window
set cmdList to {"cd /Users/spankie/go/src/github.com/ChrisPowellIinc/allofus2018 && /usr/local/caddy/caddy", "/Users/spankie/go/bin/modd", "/usr/local/bin/yarn start"}
# set cmdList to {"ls", "cd /Users/spankie/go/src/github.com/ChrisPowellIinc/allofus2018", "ls"}
# You can append to the list just to break up really long lines
# set cmdList to cmdList & {"ssh user@host3.example.com"}


tell application "iTerm2"
  # Not sure how to create an "empty" window so for the window we pick the
  # first command in the list
	-- command item 1 of cmdList
  set newWindow to current window# (create window with default profile command item 1 of cmdList)

	tell current session of current window
		write text "cd /Users/spankie/go/src/github.com/ChrisPowellIinc/allofus2018"
		write text "caddy"
	end tell

	tell current session of current window
		set modd to split vertically with default profile
		tell modd
			write text "cd /Users/spankie/go/src/github.com/ChrisPowellIinc/allofus2018"
			write text "modd"
		end tell
		set yarn to split horizontally with default profile
		tell yarn
			write text "cd /Users/spankie/go/src/github.com/ChrisPowellIinc/allofus2018"
			write text "yarn start"
		end tell
	end tell

  # Personal preference - adjust as you see fit.  You can get fancier
  # by getting the desktop size and setting these relative to that if you want
  -- tell newWindow
  --   # bounds are top left X, Y, width, height
  --   set bounds to {75,150,900,800}
  -- end tell
  # Create new tabs for the rest of the commands.  If there is no
  # item 2+ this simply doesn't do anything (i.e. it doesn't throw an error)
  -- repeat with x from 1 to count of cmdList
	-- 	tell current session of current window
	-- 		-- write text "cd /Users/spankie/go/src/github.com/ChrisPowellIinc/allofus2018"
	-- 		set ss to split horizontally with default profile
	-- 		tell ss
	-- 			write text "cd /Users/spankie/go/src/github.com/ChrisPowellIinc/allofus2018"
	-- 			command item x of cmdList
	-- 		end tell
	-- 	end tell
  --   -- tell newWindow
  --   --   create tab with default profile command item x of cmdList
  --   -- end tell
  -- end repeat
end tell