{
  UniCastle - Main Game View
  Simple one-tower gameplay introducing Fibonacci mechanics
  Copyright 2024 VLTRN Games
}
unit GameViewMain;

interface

uses
  Classes, SysUtils,
  CastleVectors, CastleUIControls, CastleControls, CastleKeysMouse,
  CastleColors, FibonacciCore, GoldenColors;

type
  { Player state }
  TPlayer = class
    Position: TVector2;
    Velocity: TVector2;
    OnGround: Boolean;
    JumpIndex: Integer;  { Current position in Fibonacci jump sequence }
    Score: Integer;

    constructor Create;
    procedure Reset;
  end;

  { Collectible golden spiral }
  TGoldenSpiral = class
    Position: TVector2;
    Rotation: Single;
    Collected: Boolean;
    FibValue: Integer;  { Fibonacci number this spiral represents }

    constructor Create(APosition: TVector2; AFibIndex: Integer);
  end;

  { Main game view }
  TViewMain = class(TCastleView)
  private
    Player: TPlayer;
    Spirals: array[0..7] of TGoldenSpiral;
    LabelScore: TCastleLabel;
    LabelFps: TCastleLabel;
    LabelInstructions: TCastleLabel;
    Palette: TGamePalette;
    GameTime: Single;
    TowerWidth: Single;
    TowerHeight: Single;

    procedure SpawnSpirals;
    procedure CheckCollisions;
  public
    constructor Create(AOwner: TComponent); override;
    destructor Destroy; override;
    procedure Start; override;
    procedure Update(const SecondsPassed: Single; var HandleInput: Boolean); override;
    procedure Render; override;
    function Press(const Event: TInputPressRelease): Boolean; override;
  end;

var
  ViewMain: TViewMain;

implementation

uses
  CastleGLUtils, CastleRectangles, Math;

const
  GRAVITY = 800.0;
  PLAYER_SIZE = 30.0;
  GROUND_LEVEL = 100.0;

{ TPlayer }

constructor TPlayer.Create;
begin
  inherited;
  Reset;
end;

procedure TPlayer.Reset;
begin
  Position := Vector2(640, GROUND_LEVEL);
  Velocity := Vector2(0, 0);
  OnGround := True;
  JumpIndex := 0;
  Score := 0;
end;

{ TGoldenSpiral }

constructor TGoldenSpiral.Create(APosition: TVector2; AFibIndex: Integer);
begin
  inherited Create;
  Position := APosition;
  Rotation := 0;
  Collected := False;
  FibValue := Fib(AFibIndex);
end;

{ TViewMain }

constructor TViewMain.Create(AOwner: TComponent);
var
  i: Integer;
begin
  inherited;
  Palette := UniCastlePalette;
  Player := TPlayer.Create;
  GameTime := 0;

  { Initialize spirals array }
  for i := 0 to High(Spirals) do
    Spirals[i] := nil;
end;

destructor TViewMain.Destroy;
var
  i: Integer;
begin
  Player.Free;
  for i := 0 to High(Spirals) do
    if Spirals[i] <> nil then
      Spirals[i].Free;
  inherited;
end;

procedure TViewMain.Start;
begin
  inherited;

  Container.BackgroundColor := Palette.Background;

  TowerWidth := 200;
  TowerHeight := GoldenRectangleWidth(TowerWidth);

  { Score label }
  LabelScore := TCastleLabel.Create(FreeAtStop);
  LabelScore.Caption := 'Score: 0';
  LabelScore.FontSize := 32;
  LabelScore.Color := Palette.Primary;
  LabelScore.Anchor(hpLeft, 20);
  LabelScore.Anchor(vpTop, -20);
  InsertFront(LabelScore);

  { FPS label }
  LabelFps := TCastleLabel.Create(FreeAtStop);
  LabelFps.FontSize := 16;
  LabelFps.Color := Palette.Tertiary;
  LabelFps.Anchor(hpRight, -20);
  LabelFps.Anchor(vpTop, -20);
  InsertFront(LabelFps);

  { Instructions }
  LabelInstructions := TCastleLabel.Create(FreeAtStop);
  LabelInstructions.Caption := 'SPACE to Jump • Collect Golden Spirals • Jump Power Follows Fibonacci!';
  LabelInstructions.FontSize := 18;
  LabelInstructions.Color := Palette.Accent;
  LabelInstructions.Anchor(hpMiddle);
  LabelInstructions.Anchor(vpBottom, 20);
  InsertFront(LabelInstructions);

  SpawnSpirals;
end;

procedure TViewMain.SpawnSpirals;
var
  i: Integer;
  xPos, yPos: Single;
begin
  { Spawn spirals at Fibonacci-based positions }
  for i := 0 to High(Spirals) do
  begin
    if Spirals[i] <> nil then
      Spirals[i].Free;

    { Position spirals using golden ratio distribution }
    xPos := 200 + (i + 1) * 130;
    yPos := GROUND_LEVEL + 100 + Fib(i + 1) * 15;

    Spirals[i] := TGoldenSpiral.Create(Vector2(xPos, yPos), i + 1);
  end;
end;

procedure TViewMain.CheckCollisions;
var
  i: Integer;
  distance: Single;
begin
  for i := 0 to High(Spirals) do
  begin
    if (Spirals[i] <> nil) and (not Spirals[i].Collected) then
    begin
      distance := Vector2(
        Player.Position.X - Spirals[i].Position.X,
        Player.Position.Y - Spirals[i].Position.Y
      ).Length;

      if distance < (PLAYER_SIZE + 20) then
      begin
        Spirals[i].Collected := True;
        Player.Score := Player.Score + Spirals[i].FibValue;
        LabelScore.Caption := Format('Score: %d (Fib!)', [Player.Score]);
      end;
    end;
  end;
end;

procedure TViewMain.Update(const SecondsPassed: Single; var HandleInput: Boolean);
var
  i: Integer;
begin
  inherited;

  GameTime := GameTime + SecondsPassed;

  { Update FPS }
  LabelFps.Caption := Format('FPS: %d', [Container.Fps.RealFps]);

  { Physics for player }
  if not Player.OnGround then
  begin
    Player.Velocity := Vector2(
      Player.Velocity.X,
      Player.Velocity.Y - GRAVITY * SecondsPassed
    );
  end;

  { Update player position }
  Player.Position := Vector2(
    Player.Position.X + Player.Velocity.X * SecondsPassed,
    Player.Position.Y + Player.Velocity.Y * SecondsPassed
  );

  { Ground collision }
  if Player.Position.Y <= GROUND_LEVEL then
  begin
    Player.Position := Vector2(Player.Position.X, GROUND_LEVEL);
    Player.Velocity := Vector2(Player.Velocity.X, 0);
    Player.OnGround := True;
    Player.JumpIndex := 0;  { Reset jump sequence when landing }
  end
  else
  begin
    Player.OnGround := False;
  end;

  { Rotate spirals using golden angle }
  for i := 0 to High(Spirals) do
  begin
    if Spirals[i] <> nil then
      Spirals[i].Rotation := Spirals[i].Rotation + GoldenAngle * SecondsPassed / 10;
  end;

  CheckCollisions;
end;

procedure TViewMain.Render;
var
  CenterX: Single;
  i, j: Integer;
  SpiralSize: Single;
  SpiralColor: TCastleColor;
  PlayerColor: TCastleColor;
begin
  inherited;

  CenterX := Container.PixelsWidth / 2;

  { Draw the single tower }
  DrawRectangle(
    FloatRectangle(
      CenterX - TowerWidth / 2,
      GROUND_LEVEL,
      TowerWidth,
      TowerHeight
    ),
    Palette.Primary
  );

  { Tower top }
  DrawRectangle(
    FloatRectangle(
      CenterX - (TowerWidth * 0.7) / 2,
      GROUND_LEVEL + TowerHeight,
      TowerWidth * 0.7,
      50
    ),
    LightenColor(Palette.Primary, 0.2)
  );

  { Draw ground }
  DrawRectangle(
    FloatRectangle(0, 0, Container.PixelsWidth, GROUND_LEVEL),
    DarkenColor(Palette.Background, 0.2)
  );

  { Draw spirals }
  for i := 0 to High(Spirals) do
  begin
    if (Spirals[i] <> nil) and (not Spirals[i].Collected) then
    begin
      SpiralSize := Fib(i + 1) * 3;
      SpiralColor := FibonacciColor(i + 1, 0.8, 0.9);

      { Draw spiral as rotating circles forming golden spiral pattern }
      for j := 0 to 5 do
      begin
        DrawCircle(
          Vector2(
            Spirals[i].Position.X + Cos(DegToRad(Spirals[i].Rotation + j * 60)) * (j * 8),
            Spirals[i].Position.Y + Sin(DegToRad(Spirals[i].Rotation + j * 60)) * (j * 8)
          ),
          SpiralSize - j * 2,
          SpiralSize - j * 2,
          WithAlpha(SpiralColor, 1.0 - j * 0.15)
        );
      end;

      { Draw Fibonacci number }
      FallbackFont.Print(
        Spirals[i].Position.X - 10,
        Spirals[i].Position.Y - 35,
        COLOR_TEXT_PRIMARY,
        IntToStr(Spirals[i].FibValue)
      );
    end;
  end;

  { Draw player }
  PlayerColor := Palette.Accent;
  if not Player.OnGround then
    PlayerColor := LerpColor(Palette.Accent, Palette.Primary, 0.5);

  DrawCircle(
    Player.Position,
    PLAYER_SIZE,
    PLAYER_SIZE,
    PlayerColor
  );

  { Draw player indicator }
  FallbackFont.Print(
    Player.Position.X - 15,
    Player.Position.Y - 10,
    DarkenColor(PlayerColor, 0.5),
    '👑'  { Using crown emoji as player marker }
  );

  { Draw Fibonacci sequence reminder }
  FallbackFont.Print(
    20,
    Container.PixelsHeight - 50,
    Palette.Tertiary,
    Format('Jump Sequence: %d → %d → %d → %d → %d → %d...',
      [Fib(1), Fib(2), Fib(3), Fib(4), Fib(5), Fib(6)])
  );

  { Draw current jump power }
  if not Player.OnGround then
  begin
    FallbackFont.Print(
      Player.Position.X - 20,
      Player.Position.Y + 50,
      COLOR_TEXT_PRIMARY,
      Format('Jump: %d', [Fib(Player.JumpIndex)])
    );
  end;
end;

function TViewMain.Press(const Event: TInputPressRelease): Boolean;
var
  JumpPower: Single;
begin
  Result := inherited;
  if Result then Exit;

  if Event.IsKey(keySpace) and Player.OnGround then
  begin
    { Fibonacci jump mechanics }
    JumpPower := Fib(Player.JumpIndex + 1) * 50.0;
    Player.Velocity := Vector2(0, JumpPower);
    Player.OnGround := False;

    { Advance in Fibonacci sequence }
    Player.JumpIndex := (Player.JumpIndex + 1) mod 8;  { Cycle through first 8 Fibonacci numbers }

    Result := True;
  end;
end;

end.
