{
  Golden Colors Library
  Part of the Fibonacci Castle Suite

  Provides pre-defined color palettes based on the golden ratio
  and Fibonacci sequence for consistent visual design across all games.

  Copyright 2024 VLTRN Games
}
unit GoldenColors;

interface

uses
  CastleColors, CastleVectors, FibonacciCore;

type
  { Game-specific color palettes }
  TGamePalette = record
    Primary: TCastleColor;
    Secondary: TCastleColor;
    Tertiary: TCastleColor;
    Background: TCastleColor;
    Accent: TCastleColor;
  end;

{ Pre-defined palettes for each game in the suite }
function UniCastlePalette: TGamePalette;
function DuoCastlePalette: TGamePalette;
function TriCastlePalette: TGamePalette;
function PentaCastlePalette: TGamePalette;
function OctaCastlePalette: TGamePalette;
function FiboQuestPalette: TGamePalette;
function SpiralCitadelPalette: TGamePalette;

{ UI color constants }
const
  { UniCastle - Pure Gold }
  COLOR_UNI_GOLD = Vector4(1.0, 0.843, 0.0, 1.0);        // #FFD700
  COLOR_UNI_BG = Vector4(0.15, 0.10, 0.05, 1.0);         // Dark brown

  { DuoCastle - Gold & Deep Blue }
  COLOR_DUO_GOLD = Vector4(1.0, 0.843, 0.0, 1.0);        // #FFD700
  COLOR_DUO_BLUE = Vector4(0.047, 0.290, 0.541, 1.0);    // #0C4A8A
  COLOR_DUO_BG = Vector4(0.10, 0.12, 0.15, 1.0);         // Dark blue-gray

  { TriCastle - Golden Trifecta }
  COLOR_TRI_GOLD = Vector4(1.0, 0.843, 0.0, 1.0);        // #FFD700
  COLOR_TRI_BROWN = Vector4(0.541, 0.290, 0.047, 1.0);   // #8A4A0C
  COLOR_TRI_GREEN = Vector4(0.047, 0.541, 0.290, 1.0);   // #0C8A4A
  COLOR_TRI_BG = Vector4(0.12, 0.10, 0.08, 1.0);         // Warm gray

  { PentaCastle - Pentagon Harmony }
  COLOR_PENTA_1 = Vector4(1.0, 0.843, 0.0, 1.0);         // Gold
  COLOR_PENTA_2 = Vector4(0.8, 0.2, 0.2, 1.0);           // Ruby Red
  COLOR_PENTA_3 = Vector4(0.2, 0.6, 0.8, 1.0);           // Sky Blue
  COLOR_PENTA_4 = Vector4(0.4, 0.8, 0.4, 1.0);           // Jade Green
  COLOR_PENTA_5 = Vector4(0.7, 0.4, 0.9, 1.0);           // Amethyst
  COLOR_PENTA_BG = Vector4(0.08, 0.08, 0.12, 1.0);       // Deep twilight

  { OctaCastle - Octagonal Spectrum }
  COLOR_OCTA_BG = Vector4(0.05, 0.05, 0.08, 1.0);        // Nearly black

  { FiboQuest - Full Spectrum }
  COLOR_FIBO_BG = Vector4(0.10, 0.08, 0.12, 1.0);        // Deep purple-gray

  { Spiral Citadel - Ultimate Gold }
  COLOR_SPIRAL_GOLD = Vector4(1.0, 0.922, 0.545, 1.0);   // Bright gold
  COLOR_SPIRAL_PLATINUM = Vector4(0.9, 0.9, 0.95, 1.0);  // Platinum
  COLOR_SPIRAL_BG = Vector4(0.03, 0.03, 0.05, 1.0);      // Almost black

  { Common UI colors }
  COLOR_TEXT_PRIMARY = Vector4(1.0, 1.0, 1.0, 1.0);      // White
  COLOR_TEXT_SECONDARY = Vector4(0.8, 0.8, 0.8, 1.0);    // Light gray
  COLOR_TEXT_DISABLED = Vector4(0.5, 0.5, 0.5, 1.0);     // Gray
  COLOR_SUCCESS = Vector4(0.3, 0.8, 0.3, 1.0);           // Green
  COLOR_WARNING = Vector4(1.0, 0.8, 0.0, 1.0);           // Amber
  COLOR_ERROR = Vector4(0.9, 0.2, 0.2, 1.0);             // Red

{ Gradient generation using golden ratio }
type
  TGoldenGradient = class
  private
    FColorCount: Integer;
    FColors: array of TCastleColor;
  public
    constructor Create(startHue: Single; count: Integer);
    function GetColor(index: Integer): TCastleColor;
    function Interpolate(t: Single): TCastleColor;
    property ColorCount: Integer read FColorCount;
  end;

{ Helper functions }
function CreateGoldenGradient(startHue: Single; count: Integer): TGoldenGradient;
function LerpColor(colorA, colorB: TCastleColor; t: Single): TCastleColor;
function DarkenColor(color: TCastleColor; amount: Single): TCastleColor;
function LightenColor(color: TCastleColor; amount: Single): TCastleColor;
function WithAlpha(color: TCastleColor; alpha: Single): TCastleColor;

implementation

uses
  Math, SysUtils;

{ Game Palettes }

function UniCastlePalette: TGamePalette;
begin
  Result.Primary := COLOR_UNI_GOLD;
  Result.Secondary := DarkenColor(COLOR_UNI_GOLD, 0.3);
  Result.Tertiary := LightenColor(COLOR_UNI_GOLD, 0.2);
  Result.Background := COLOR_UNI_BG;
  Result.Accent := Vector4(1.0, 1.0, 0.8, 1.0);  // Pale yellow
end;

function DuoCastlePalette: TGamePalette;
begin
  Result.Primary := COLOR_DUO_GOLD;
  Result.Secondary := COLOR_DUO_BLUE;
  Result.Tertiary := LerpColor(COLOR_DUO_GOLD, COLOR_DUO_BLUE, 0.5);
  Result.Background := COLOR_DUO_BG;
  Result.Accent := Vector4(0.6, 0.8, 1.0, 1.0);  // Light cyan
end;

function TriCastlePalette: TGamePalette;
begin
  Result.Primary := COLOR_TRI_GOLD;
  Result.Secondary := COLOR_TRI_BROWN;
  Result.Tertiary := COLOR_TRI_GREEN;
  Result.Background := COLOR_TRI_BG;
  Result.Accent := Vector4(0.8, 1.0, 0.8, 1.0);  // Pale green
end;

function PentaCastlePalette: TGamePalette;
begin
  Result.Primary := COLOR_PENTA_1;
  Result.Secondary := COLOR_PENTA_2;
  Result.Tertiary := COLOR_PENTA_3;
  Result.Background := COLOR_PENTA_BG;
  Result.Accent := COLOR_PENTA_5;
end;

function OctaCastlePalette: TGamePalette;
begin
  // Uses dynamic golden ratio colors
  Result.Primary := FibonacciColor(8, 0.7, 0.9);
  Result.Secondary := FibonacciColor(13, 0.7, 0.9);
  Result.Tertiary := FibonacciColor(21, 0.7, 0.9);
  Result.Background := COLOR_OCTA_BG;
  Result.Accent := FibonacciColor(5, 0.9, 1.0);
end;

function FiboQuestPalette: TGamePalette;
begin
  // Rainbow palette using golden ratio distribution
  Result.Primary := FibonacciColor(1, 0.8, 0.95);
  Result.Secondary := FibonacciColor(3, 0.8, 0.95);
  Result.Tertiary := FibonacciColor(5, 0.8, 0.95);
  Result.Background := COLOR_FIBO_BG;
  Result.Accent := FibonacciColor(8, 1.0, 1.0);
end;

function SpiralCitadelPalette: TGamePalette;
begin
  Result.Primary := COLOR_SPIRAL_GOLD;
  Result.Secondary := COLOR_SPIRAL_PLATINUM;
  Result.Tertiary := LerpColor(COLOR_SPIRAL_GOLD, COLOR_SPIRAL_PLATINUM, PHI_INVERSE);
  Result.Background := COLOR_SPIRAL_BG;
  Result.Accent := Vector4(1.0, 1.0, 0.9, 1.0);  // Bright cream
end;

{ TGoldenGradient }

constructor TGoldenGradient.Create(startHue: Single; count: Integer);
var
  i: Integer;
  hue: Single;
begin
  inherited Create;
  FColorCount := count;
  SetLength(FColors, count);

  for i := 0 to count - 1 do
  begin
    hue := startHue + (i * GoldenAngle);
    while hue >= 360 do
      hue := hue - 360;
    FColors[i] := GoldenRatioColor(hue, 0.7, 0.85);
  end;
end;

function TGoldenGradient.GetColor(index: Integer): TCastleColor;
begin
  if (index >= 0) and (index < FColorCount) then
    Result := FColors[index]
  else
    Result := FColors[0];
end;

function TGoldenGradient.Interpolate(t: Single): TCastleColor;
var
  index: Integer;
  localT: Single;
begin
  if t <= 0 then
    Exit(FColors[0]);
  if t >= 1 then
    Exit(FColors[FColorCount - 1]);

  localT := t * (FColorCount - 1);
  index := Trunc(localT);
  localT := Frac(localT);

  Result := LerpColor(FColors[index], FColors[index + 1], localT);
end;

{ Helper functions }

function CreateGoldenGradient(startHue: Single; count: Integer): TGoldenGradient;
begin
  Result := TGoldenGradient.Create(startHue, count);
end;

function LerpColor(colorA, colorB: TCastleColor; t: Single): TCastleColor;
begin
  Result := Vector4(
    Lerp(t, colorA.X, colorB.X),
    Lerp(t, colorA.Y, colorB.Y),
    Lerp(t, colorA.Z, colorB.Z),
    Lerp(t, colorA.W, colorB.W)
  );
end;

function DarkenColor(color: TCastleColor; amount: Single): TCastleColor;
begin
  Result := Vector4(
    color.X * (1 - amount),
    color.Y * (1 - amount),
    color.Z * (1 - amount),
    color.W
  );
end;

function LightenColor(color: TCastleColor; amount: Single): TCastleColor;
begin
  Result := Vector4(
    color.X + (1 - color.X) * amount,
    color.Y + (1 - color.Y) * amount,
    color.Z + (1 - color.Z) * amount,
    color.W
  );
end;

function WithAlpha(color: TCastleColor; alpha: Single): TCastleColor;
begin
  Result := Vector4(color.X, color.Y, color.Z, alpha);
end;

end.
