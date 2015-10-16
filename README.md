#Dots & Boxes Game
##GA Project 1

**Players:** Two
**Board:** 4 dots by 4 dots (In future versions, I would like to make this scalable so a user can choose their board size)

[Start of game](board.png)


**Objective:** 
Have the most completed boxes at the end of the game.

[How to win](completeboard.png)

**Game Play:** 
Players alternate drawing lines to connect two dots. The goal is to complete boxes. Players can complete boxes with lines drawn by other players. When a box is completed, the box will change colors to that of the current player and that player will earn a point for a completed box. The player who closed the box then gets to take another turn connecting another two dots. 

[Player 2 scores and takes another turn](player2scores.png)

Game play continues until all lines have been drawn between all dots on the board and all possible boxes have been made. At the end of the game, the player with the most completed boxes wins.

**About the code:** 
All lines and cells on the board are made of divs. 

Win logic is determined using relationships between element IDs (labeled H_1 through H_12 to denote the horizontal lines and V_1 through V_12 to denote the vertical lines). 

When a line is clicked on, a class name is added. For every inner line that is clicked on, the surrounding 6 lines that could make up boxes on either sides of it are checked for this class name. If either the three that make up the first box or the three that make up the second box are selected, then a box has been completed and the corresponding cell div for that box is filled in to their player color. For lines that make up the edge of the board, only 1 box is checked, but the same logic applies. 

I would like to make future iterations of this code scalable, object-based, and using a different logic to find out which boxes have been completed.

