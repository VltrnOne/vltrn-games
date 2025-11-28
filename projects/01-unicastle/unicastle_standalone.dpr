{
  UniCastle - Game 1 of the Fibonacci Castle Suite
  "One Tower Rises"

  The beginning of the mathematical journey. Players learn the basics
  while experiencing the pure essence of the golden ratio.

  Copyright 2024 VLTRN Games
}
program unicastle_standalone;

{$ifdef MSWINDOWS} {$apptype GUI} {$endif}

uses
  CastleWindow, CastleLog, GameInitialize;

begin
  InitializeLog;

  Window := TCastleWindow.Create(Application);
  Window.Caption := 'UniCastle - One Tower Rises';
  Window.Width := 1280;
  Window.Height := 720;
  Window.FpsShowOnCaption := True;

  Application.MainWindow := Window;
  Application.Run;
end.
