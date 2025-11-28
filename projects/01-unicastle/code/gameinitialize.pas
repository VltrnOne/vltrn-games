{
  UniCastle - Game Initialization
  Copyright 2024 VLTRN Games
}
unit GameInitialize;

interface

uses
  CastleWindow, CastleLog;

var
  Window: TCastleWindow;

implementation

uses
  SysUtils, CastleControls, CastleUIControls,
  GameViewMain, GameViewMenu;

initialization
  InitializeLog;

  Window := TCastleWindow.Create(Application);

  { Create and set starting view }
  ViewMenu := TViewMenu.Create(Application);
  Window.Container.View := ViewMenu;
end.
