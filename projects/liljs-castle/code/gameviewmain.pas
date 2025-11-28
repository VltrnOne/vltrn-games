{
  Copyright 2024 VLTRN Games.

  This file is part of "Lil J's Castle" - VLTRN Games project.

  "Castle Game Engine" is free software; see the file COPYING.txt,
  included in this distribution, for details about the copyright.

  ----------------------------------------------------------------------------
}
{ Main view, where most of the application logic takes place. }
unit GameViewMain;

interface

uses Classes,
  CastleVectors, CastleComponentSerialize,
  CastleUIControls, CastleControls, CastleKeysMouse;

type
  { Main view, where most of the application logic takes place. }
  TViewMain = class(TCastleView)
  published
    { Components designed using CGE editor.
      These fields will be automatically initialized at Start. }
    LabelTitle: TCastleLabel;
    LabelFps: TCastleLabel;
  private
    LifeTime: Double;
  public
    constructor Create(AOwner: TComponent); override;
    procedure Start; override;
    procedure Update(const SecondsPassed: Single; var HandleInput: Boolean); override;
    procedure Render; override;
  end;

var
  ViewMain: TViewMain;

implementation

uses SysUtils,
  CastleGLUtils, CastleRectangles, CastleColors, CastleLog;

{ TViewMain ----------------------------------------------------------------- }

constructor TViewMain.Create(AOwner: TComponent);
begin
  inherited;
  // TODO: Load UI design when web data loading is fully supported
  // DesignUrl := 'castle-data:/gameviewmain.castle-user-interface';
end;

procedure TViewMain.Start;
begin
  inherited;

  // Set background color - castle theme
  Container.BackgroundColor := Vector4(0.2, 0.15, 0.1, 1.0);

  // Create title label
  LabelTitle := TCastleLabel.Create(FreeAtStop);
  LabelTitle.Anchor(hpMiddle);
  LabelTitle.Anchor(vpTop, -20);
  LabelTitle.Caption := 'Lil J''s Castle';
  LabelTitle.Color := Vector4(1.0, 0.8, 0.4, 1.0); // Gold color
  LabelTitle.FontSize := 48;
  LabelTitle.FontStyle := [fsBold];
  InsertFront(LabelTitle);

  // Create FPS label
  LabelFps := TCastleLabel.Create(FreeAtStop);
  LabelFps.Anchor(hpLeft, 10);
  LabelFps.Anchor(vpTop, -10);
  LabelFps.Color := Gray;
  LabelFps.FontSize := 16;
  InsertFront(LabelFps);
end;

procedure TViewMain.Render;
var
  CenterX, CenterY: Single;
begin
  inherited;

  CenterX := Container.PixelsWidth / 2;
  CenterY := Container.PixelsHeight / 2;

  // Draw animated castle silhouette
  DrawCircle(
    Vector2(
      CenterX + 50 * Sin(LifeTime * 2),
      CenterY - 50 + 30 * Cos(LifeTime * 1.5)
    ),
    40, 40, Vector4(0.6, 0.5, 0.4, 1.0) // Brown castle color
  );

  // Draw castle towers (simple rectangles)
  DrawRectangle(FloatRectangle(CenterX - 100, CenterY - 100, 40, 80), Vector4(0.5, 0.4, 0.3, 1.0));
  DrawRectangle(FloatRectangle(CenterX - 20, CenterY - 120, 40, 100), Vector4(0.5, 0.4, 0.3, 1.0));
  DrawRectangle(FloatRectangle(CenterX + 60, CenterY - 100, 40, 80), Vector4(0.5, 0.4, 0.3, 1.0));

  // Draw welcome message
  FallbackFont.Print(
    CenterX - 150,
    CenterY + 100,
    Vector4(1.0, 1.0, 1.0, 1.0),
    'Welcome to Lil J''s Castle!' + NL +
    'Built with Castle Game Engine' + NL +
    'Deployed to vltrngames.com'
  );

  // Draw decorative elements
  DrawCircle(
    Vector2(
      CenterX - 150 + 30 * Sin(LifeTime * 3),
      CenterY + 50 + 20 * Cos(LifeTime * 2)
    ),
    15, 15, Vector4(1.0, 0.9, 0.6, 0.8) // Star-like element
  );
end;

procedure TViewMain.Update(const SecondsPassed: Single; var HandleInput: Boolean);
begin
  inherited;
  { This virtual method is executed every frame (many times per second). }
  LifeTime := LifeTime + SecondsPassed;
  if Assigned(LabelFps) then
    LabelFps.Caption := 'FPS: ' + Container.Fps.ToString;
end;

end.

