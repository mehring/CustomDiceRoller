
input = OpenFile(#PB_Any,"C:\inetpub\wwwroot\dicegame\css\icons.css")
output = CreateFile(#PB_Any,"C:\inetpub\wwwroot\dicegame\output.txt")

While Eof(input) = 0
  stringToParse.s = ReadString(input)
  If Mid(stringToParse,1,5) = ".ico-"
    
    parseText.s = ""
    curLetter.s = ""
    For i = 6 To Len(stringToParse)
      curLetter = Mid(stringToParse,i,1)
      If curLetter <> ":"
        parseText + curLetter
      Else : Break
      EndIf
    Next i
    parseText = Trim(parseText)
    
    stringToWrite.s = "<div class='ico-"+parseText+" ico-set' ng-click='setEditIcon("+Chr(34)+parseText+Chr(34)+")'></div>"
    WriteStringN(output, stringToWrite)
    
  EndIf
Wend
; IDE Options = PureBasic 4.10 (Windows - x86)
; CursorPosition = 19
; Folding = -