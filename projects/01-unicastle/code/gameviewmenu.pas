{
  UniCastle - Main Menu View
  Features golden ratio layout and Fibonacci-themed design
  Copyright 2024 VLTRN Games
}
unit GameViewMenu;

interface

uses
  Classes, SysUtils,
  CastleVectors, CastleUIControls, CastleControls, CastleKeysMouse,
  CastleColors, FibonacciCore, GoldenColors;

type
  TViewMenu = class(TCastleView)
  private
    LabelTitle: TCastleLabel;
    LabelSubtitle: TCastleLabel;
    ButtonPlay: TCastleButton;
    ButtonAbout: TCastleButton;
    AnimTime: Single;
    Palette: TGamePalette;

    procedure ButtonPlayClick(Sender: TObject);
    procedure ButtonAboutClick(Sender: TObject);
  public
    constructor Create(AOwner: TComponent); override;
    procedure Start; override;
    procedure Update(const SecondsPassed: Single; var HandleInput: Boolean); override;
    procedure Render; override;
  end;

var
  ViewMenu: TViewMenu;

implementation

uses
  CastleGLUtils, CastleRectangles, Math,
  GameViewMain;

{ TViewMenu }

constructor TViewMenu.Create(AOwner: TComponent);
begin
  inherited;
  AnimTime := 0;
  Palette := UniCastlePalette;
end;

procedure TViewMenu.Start;
var
  ScreenCenter: Single;
begin
  inherited;

  Container.BackgroundColor := Palette.Background;

  ScreenCenter := Container.PixelsWidth / 2;

  { Title - positioned using golden ratio }
  LabelTitle := TCastleLabel.Create(FreeAtStop);
  LabelTitle.Caption := 'UNICASTLE';
  LabelTitle.FontSize := 72;
  LabelTitle.Color := Palette.Primary;
  LabelTitle.Anchor(hpMiddle);
  LabelTitle.Anchor(vpTop, -Round(Container.PixelsHeight * (1 - PHI_INVERSE)));
  InsertFront(LabelTitle);

  { Subtitle }
  LabelSubtitle := TCastleLabel.Create(FreeAtStop);
  LabelSubtitle.Caption := 'One Tower Rises';
  LabelSubtitle.FontSize := 24;
  LabelSubtitle.Color := Palette.Accent;
  LabelSubtitle.Anchor(hpMiddle);
  LabelSubtitle.Anchor(vpTop, -Round(Container.PixelsHeight * (1 - PHI_INVERSE)) - 90);
  InsertFront(LabelSubtitle);

  { Play Button - positioned at golden section }
  ButtonPlay := TCastleButton.Create(FreeAtStop);
  ButtonPlay.Caption := 'Begin Your Journey';
  ButtonPlay.FontSize := 32;
  ButtonPlay.AutoSize := False;
  ButtonPlay.Width := 400;
  ButtonPlay.Height := 80;
  ButtonPlay.EnableParentDragging := False;
  ButtonPlay.CustomBackground := True;
  ButtonPlay.CustomBackgroundNormal := Palette.Primary;
  ButtonPlay.CustomBackgroundPressed := DarkenColor(Palette.Primary, 0.2);
  ButtonPlay.CustomTextColor := Vector4(0.1, 0.05, 0, 1.0);
  ButtonPlay.Anchor(hpMiddle);
  ButtonPlay.Anchor(vpMiddle, -40);
  ButtonPlay.OnClick := @ButtonPlayClick;
  InsertFront(ButtonPlay);

  { About Button }
  ButtonAbout := TCastleButton.Create(FreeAtStop);
  ButtonAbout.Caption := 'About Fibonacci Suite';
  ButtonAbout.FontSize := 20;
  ButtonAbout.AutoSize := False;
  ButtonAbout.Width := 300;
  ButtonAbout.Height := 60;
  ButtonAbout.EnableParentDragging := False;
  ButtonAbout.CustomBackground := True;
  ButtonAbout.CustomBackgroundNormal := Palette.Secondary;
  ButtonAbout.CustomBackgroundPressed := DarkenColor(Palette.Secondary, 0.2);
  ButtonAbout.CustomTextColor := Palette.Accent;
  ButtonAbout.Anchor(hpMiddle);
  ButtonAbout.Anchor(vpMiddle, -160);
  ButtonAbout.OnClick := @ButtonAboutClick;
  InsertFront(ButtonAbout);
end;

procedure TViewMenu.Update(const SecondsPassed: Single; var HandleInput: Boolean);
begin
  inherited;
  AnimTime := AnimTime + SecondsPassed;
end;

procedure TViewMenu.Render;
var
  CenterX, CenterY: Single;
  TowerHeight: Single;
  TowerWidth: Single;
  PulseScale: Single;
  i: Integer;
  SpiralPoint: TVector2;
begin
  inherited;

  CenterX := Container.PixelsWidth / 2;
  CenterY := Container.PixelsHeight / 2;

  { Draw the One Tower - using golden rectangle proportions }
  TowerHeight := 200;
  TowerWidth := GoldenRectangleHeight(TowerHeight);

  { Gentle pulse animation using golden ratio timing }
  PulseScale := 1.0 + 0.05 * Sin(AnimTime * PHI);

  { Tower base }
  DrawRectangle(
    FloatRectangle(
      CenterX - (TowerWidth * PulseScale) / 2,
      CenterY + 120,
      TowerWidth * PulseScale,
      TowerHeight * PulseScale
    ),
    Palette.Primary
  );

  { Tower top (triangular roof approximation) }
  DrawRectangle(
    FloatRectangle(
      CenterX - (TowerWidth * PulseScale * 0.7) / 2,
      CenterY + 120 + TowerHeight * PulseScale,
      TowerWidth * PulseScale * 0.7,
      40 * PulseScale
    ),
    LightenColor(Palette.Primary, 0.2)
  );

  { Draw decorative golden spirals around the tower }
  for i := 0 to 7 do  { 8 spirals (Fibonacci number) }
  begin
    SpiralPoint := GoldenSpiralPoint(AnimTime * 30 + i * 45, 3.0);
    DrawCircle(
      Vector2(
        CenterX + SpiralPoint.X * 50,
        CenterY + 200 + SpiralPoint.Y * 50
      ),
      Fib(3) * 2,  { Radius = 2 * Fib(3) = 4 pixels }
      Fib(3) * 2,
      WithAlpha(Palette.Accent, 0.6)
    );
  end;

  { Draw Fibonacci number sequence at bottom as decoration }
  FallbackFont.Print(
    CenterX - 100,
    50,
    Palette.Tertiary,
    Format('1 • 1 • 2 • 3 • 5 • 8 • 13 • φ=%.3f', [PHI])
  );
end;

procedure TViewMenu.ButtonPlayClick(Sender: TObject);
begin
  { Switch to main game view }
  if ViewMain = nil then
    ViewMain := TViewMain.Create(Application);
  Container.View := ViewMain;
end;

procedure TViewMenu.ButtonAboutClick(Sender: TObject);
begin
  { TODO: Create About view explaining Fibonacci concepts }
  WritelnLog('About', 'Fibonacci Castle Suite - Where Mathematics Meets Magic');
end;

end.
