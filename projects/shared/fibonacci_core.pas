{
  Fibonacci Core Library
  Part of the Fibonacci Castle Suite

  Provides core Fibonacci sequence functions, golden ratio calculations,
  and mathematical utilities for all games in the suite.

  Copyright 2024 VLTRN Games
}
unit FibonacciCore;

interface

uses
  SysUtils, Math, CastleColors, CastleVectors;

const
  { The Golden Ratio - φ (phi) }
  PHI = 1.618033988749894848204586834;

  { The Golden Ratio Conjugate - 1/φ }
  PHI_INVERSE = 0.618033988749894848204586834;

  { The Golden Angle in degrees (360° × φ⁻²) ≈ 137.508° }
  GOLDEN_ANGLE_DEG = 137.507764050443682;

  { The Golden Angle in radians }
  GOLDEN_ANGLE_RAD = 2.399963229728653;

type
  { Main Fibonacci sequence manager }
  TFibSequence = class
  private
    FCache: array[0..30] of Int64;
    procedure BuildCache;
  public
    constructor Create;

    { Get the nth Fibonacci number (0-indexed)
      Fib(0)=0, Fib(1)=1, Fib(2)=1, Fib(3)=2, etc. }
    function Get(n: Integer): Int64;

    { Get the ratio between Fib(n) and Fib(n-1)
      Approaches φ as n increases }
    function GetRatio(n: Integer): Double;

    { Check if a number is in the Fibonacci sequence }
    function IsFibonacci(num: Int64): Boolean;

    { Find the Fibonacci number closest to a given value }
    function Closest(value: Int64): Int64;

    { Get the index of a Fibonacci number }
    function IndexOf(fibNum: Int64): Integer;
  end;

{ Global Fibonacci sequence instance }
var
  FibSeq: TFibSequence;

{ Quick access functions }
function Fib(n: Integer): Int64;
function GoldenRatio: Double;
function GoldenAngle: Double;
function GoldenAngleRad: Double;

{ Color generation using golden ratio }
function FibonacciColor(index: Integer; saturation: Single = 0.65;
                        brightness: Single = 0.85): TCastleColor;
function GoldenRatioColor(hueOffset: Single; saturation: Single = 0.65;
                          brightness: Single = 0.85): TCastleColor;

{ Layout helpers using golden ratio }
function GoldenRectangleWidth(height: Single): Single;
function GoldenRectangleHeight(width: Single): Single;
function GoldenSectionPoint(total: Single; useLarger: Boolean = True): Single;

{ Animation timing using Fibonacci }
function FibonacciDelay(index: Integer; baseDelay: Single = 0.01): Single;
function GoldenTimingCurve(t: Single): Single;

{ Spiral calculations }
function GoldenSpiralPoint(angle: Single; scale: Single = 1.0): TVector2;
function FibonacciSpiralRadius(rotations: Single): Single;

implementation

{ TFibSequence }

constructor TFibSequence.Create;
begin
  inherited;
  BuildCache;
end;

procedure TFibSequence.BuildCache;
var
  i: Integer;
begin
  FCache[0] := 0;
  FCache[1] := 1;
  for i := 2 to High(FCache) do
    FCache[i] := FCache[i-1] + FCache[i-2];
end;

function TFibSequence.Get(n: Integer): Int64;
begin
  if (n >= 0) and (n <= High(FCache)) then
    Result := FCache[n]
  else if n < 0 then
    Result := 0
  else
  begin
    // For very large n, use Binet's formula (approximate)
    Result := Round(Power(PHI, n) / Sqrt(5));
  end;
end;

function TFibSequence.GetRatio(n: Integer): Double;
var
  current, previous: Int64;
begin
  if n <= 1 then
    Exit(1.0);

  current := Get(n);
  previous := Get(n - 1);

  if previous = 0 then
    Result := 1.0
  else
    Result := current / previous;
end;

function TFibSequence.IsFibonacci(num: Int64): Boolean;
var
  i: Integer;
begin
  Result := False;
  for i := 0 to High(FCache) do
  begin
    if FCache[i] = num then
      Exit(True);
    if FCache[i] > num then
      Exit(False);
  end;
end;

function TFibSequence.Closest(value: Int64): Int64;
var
  i: Integer;
  minDiff, diff: Int64;
begin
  Result := FCache[0];
  minDiff := Abs(value - Result);

  for i := 1 to High(FCache) do
  begin
    if FCache[i] > value then
      Break;

    diff := Abs(value - FCache[i]);
    if diff < minDiff then
    begin
      minDiff := diff;
      Result := FCache[i];
    end;
  end;
end;

function TFibSequence.IndexOf(fibNum: Int64): Integer;
var
  i: Integer;
begin
  Result := -1;
  for i := 0 to High(FCache) do
  begin
    if FCache[i] = fibNum then
      Exit(i);
    if FCache[i] > fibNum then
      Exit(-1);
  end;
end;

{ Global helper functions }

function Fib(n: Integer): Int64;
begin
  Result := FibSeq.Get(n);
end;

function GoldenRatio: Double;
begin
  Result := PHI;
end;

function GoldenAngle: Double;
begin
  Result := GOLDEN_ANGLE_DEG;
end;

function GoldenAngleRad: Double;
begin
  Result := GOLDEN_ANGLE_RAD;
end;

{ Color generation }

function HSVtoRGB(H, S, V: Single): TCastleColor;
var
  C, X, m: Single;
  HPrime: Single;
  R, G, B: Single;
begin
  // Normalize H to [0, 360]
  while H < 0 do H := H + 360;
  while H >= 360 do H := H - 360;

  C := V * S;
  HPrime := H / 60.0;
  X := C * (1 - Abs(Frac(HPrime / 2) * 2 - 1));
  m := V - C;

  if HPrime < 1 then
  begin
    R := C; G := X; B := 0;
  end
  else if HPrime < 2 then
  begin
    R := X; G := C; B := 0;
  end
  else if HPrime < 3 then
  begin
    R := 0; G := C; B := X;
  end
  else if HPrime < 4 then
  begin
    R := 0; G := X; B := C;
  end
  else if HPrime < 5 then
  begin
    R := X; G := 0; B := C;
  end
  else
  begin
    R := C; G := 0; B := X;
  end;

  Result := Vector4(R + m, G + m, B + m, 1.0);
end;

function FibonacciColor(index: Integer; saturation: Single = 0.65;
                        brightness: Single = 0.85): TCastleColor;
var
  Hue: Single;
begin
  // Use golden ratio conjugate for even distribution around color wheel
  Hue := Frac(index * PHI_INVERSE) * 360;
  Result := HSVtoRGB(Hue, saturation, brightness);
end;

function GoldenRatioColor(hueOffset: Single; saturation: Single = 0.65;
                          brightness: Single = 0.85): TCastleColor;
begin
  Result := HSVtoRGB(hueOffset, saturation, brightness);
end;

{ Layout helpers }

function GoldenRectangleWidth(height: Single): Single;
begin
  Result := height * PHI;
end;

function GoldenRectangleHeight(width: Single): Single;
begin
  Result := width / PHI;
end;

function GoldenSectionPoint(total: Single; useLarger: Boolean = True): Single;
begin
  if useLarger then
    Result := total * PHI_INVERSE  // ≈ 0.618 of total
  else
    Result := total * (1 - PHI_INVERSE);  // ≈ 0.382 of total
end;

{ Animation timing }

function FibonacciDelay(index: Integer; baseDelay: Single = 0.01): Single;
begin
  Result := Fib(index) * baseDelay;
end;

function GoldenTimingCurve(t: Single): Single;
begin
  // Easing curve based on golden ratio
  // Provides natural-feeling acceleration/deceleration
  if t < PHI_INVERSE then
    Result := Power(t / PHI_INVERSE, PHI)
  else
    Result := 1.0 - Power((1 - t) / (1 - PHI_INVERSE), PHI);
end;

{ Spiral calculations }

function GoldenSpiralPoint(angle: Single; scale: Single = 1.0): TVector2;
var
  r: Single;
  angleRad: Single;
begin
  angleRad := DegToRad(angle);
  r := scale * Power(PHI, angleRad / (Pi / 2));
  Result := Vector2(r * Cos(angleRad), r * Sin(angleRad));
end;

function FibonacciSpiralRadius(rotations: Single): Single;
begin
  // Radius grows by φ for each quarter turn
  Result := Power(PHI, rotations);
end;

initialization
  FibSeq := TFibSequence.Create;

finalization
  FibSeq.Free;

end.
