param(
    [Parameter(Mandatory = $true)]
    [int]$Port,
    [switch]$Force
)

# Finds processes listening on the specified port and stops them.
$connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if (-not $connections) {
    Write-Output "Port $Port is already free."
    exit 0
}

$pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique

foreach ($pid in $pids) {
    try {
        $process = Get-Process -Id $pid -ErrorAction Stop
        $name = $process.ProcessName
    }
    catch {
        $name = "Unknown"
    }

    Write-Output "Stopping PID $pid ($name) on port $Port."

    try {
        if ($Force) {
            Stop-Process -Id $pid -Force -ErrorAction Stop
        }
        else {
            Stop-Process -Id $pid -ErrorAction Stop
        }
        Write-Output "Stopped PID $pid."
    }
    catch {
        if ($Force) {
            Write-Warning "Failed to forcibly stop PID $pid: $_"
        }
        else {
            Write-Warning "Failed to stop PID $pid. Rerun with -Force to kill."
        }
    }
}
